import { workos } from "@/server/utils/workos";

type ResetPasswordBody = {
  email: string;
};

export default defineEventHandler(async (event) => {
  const { email } = await readBody<ResetPasswordBody>(event);

  try {
    await workos.userManagement.createPasswordReset({
      email,
    });

    setResponseStatus(event, 200);
  } catch (error) {
    return new Response("Unauthorized", { status: 401 });
  }
});
