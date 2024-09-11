import { workos } from "@/server/utils/workos";
import { getJwtData } from "@/server/utils/workos/jwt/get-jwt-data";
import { getSessionId } from "@/server/utils/workos/jwt/get-session-id";

import { defineAuthEventHandler } from "@/server/utils/authHandler";

type UserChangePasswordBody = {
  oldPassword: string;
  newPassword: string;
};

export default defineAuthEventHandler(async (event, { userId }) => {
  const { oldPassword, newPassword } = await readBody<UserChangePasswordBody>(
    event
  );

  const user = await workos.userManagement.getUser(userId);

  const tempSession = await workos.userManagement.authenticateWithPassword({
    email: user.email,
    password: oldPassword,
    clientId: workos.clientId!,
  });

  if (tempSession && tempSession.user.email === user.email) {
    const sessionId = getSessionId(await getJwtData(tempSession.accessToken));

    await workos.userManagement.revokeSession({
      sessionId,
    });

    await workos.userManagement.updateUser({
      userId,
      password: newPassword,
    });

    return;
  }

  return new Response("Unauthorized", { status: 401 });
});
