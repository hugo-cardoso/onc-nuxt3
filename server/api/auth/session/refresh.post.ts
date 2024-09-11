import { workos } from "@/server/utils/workos";

import { defineAuthEventHandler } from "@/server/utils/authHandler";

type AuthSessionRefreshBody = {
  refreshToken: string;
};

export default defineAuthEventHandler(async (event) => {
  const { refreshToken } = await readBody<AuthSessionRefreshBody>(event);

  const response = await workos.userManagement.authenticateWithRefreshToken({
    clientId: workos.clientId!,
    refreshToken,
  });

  return {
    accessToken: response.accessToken,
    refreshToken: response.refreshToken,
  };
});
