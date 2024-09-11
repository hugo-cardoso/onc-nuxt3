import { workos } from "@/server/utils/workos";

import { defineAuthEventHandler } from "@/server/utils/authHandler";
import { getJwtData } from "~/server/utils/workos/jwt/get-jwt-data";

import type { User } from "@/types/User";

export default defineAuthEventHandler(async (_, { userId, accessToken }) => {
  const user = await workos.userManagement.getUser(userId);

  const { role, permissions } = await getJwtData(accessToken);

  return {
    id: userId,
    email: user.email,
    firstName: user.firstName!,
    lastName: user.lastName!,
    role,
    permissions,
  } as User;
});
