import { workos } from "@/server/utils/workos";

type SignupBody = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

type SignupResponse = {
  confirmUrl: string;
};

export default defineEventHandler(async (event) => {
  const { email, password, firstName, lastName } = await readBody<SignupBody>(
    event
  );

  try {
    const user = await workos.userManagement.createUser({
      email,
      password,
      firstName,
      lastName,
    });

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    await workos.userManagement.sendVerificationEmail({ userId: user.id });

    return {
      confirmUrl: `/auth/signup/confirm?email=${email}`,
    } satisfies SignupResponse;
  } catch (error) {
    console.log(error);
  }
});
