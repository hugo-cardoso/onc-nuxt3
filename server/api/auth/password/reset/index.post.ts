import { workos } from "@/server/utils/workos";

type ResetPasswordBody = {
  token: string;
  password: string;
};

export default defineEventHandler(async (event) => {
  const { token, password } = await readBody<ResetPasswordBody>(event);

  try {

    const resetToken = await workos.userManagement.getPasswordReset(token);

    await workos.userManagement.resetPassword({
      token,
      newPassword: password,
    });

    setResponseStatus(event, 200);
  } catch (error) {
    console.log(error);
    return new Response("Unauthorized", { status: 401 });
  }
});
