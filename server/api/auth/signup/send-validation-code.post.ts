import { workos } from "@/server/utils/workos";

type SignupSendValidationBody = {
  email: string;
};

export default defineEventHandler(async (event) => {
  const { email } = await readBody<SignupSendValidationBody>(event);

  try {
    const users = await workos.userManagement.listUsers({ email, limit: 1 });

    if (!users.data.length) throw new Error("User not found");

    const { id: userId } = users.data.at(0)!;

    await workos.userManagement.sendVerificationEmail({ userId });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
});
