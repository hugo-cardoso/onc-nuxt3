import { workos } from "@/server/utils/workos";

type SignupValidateBody = {
  email: string;
  code: string;
};

export default defineEventHandler(async (event) => {
  const { email, code } = await readBody<SignupValidateBody>(event);

  try {
    const users = await workos.userManagement.listUsers({ email });

    if (!users.data.length) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { id: userId } = users.data[0];

    await workos.userManagement.verifyEmail({ userId, code });

    setResponseStatus(event, 200);
  } catch (error) {
    console.log(error);
  }
});
