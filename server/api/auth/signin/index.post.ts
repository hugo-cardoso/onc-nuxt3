import { workos } from "@/server/utils/workos";

type LoginBody = {
  email: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export default defineEventHandler(async (event) => {
  try {
    const { email, password } = await readBody<LoginBody>(event);

    const { accessToken, refreshToken } =
      await workos.userManagement.authenticateWithPassword({
        email,
        password,
        clientId: workos.userManagement.clientId!,
      });

    return {
      accessToken,
      refreshToken,
    } as LoginResponse;
  } catch (error) {
    console.log(error);
    return new Response("Unauthorized", { status: 401 });
  }
});
