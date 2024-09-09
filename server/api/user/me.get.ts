import { workos } from "@/server/utils/workos";

import { defineAuthEventHandler } from "@/server/utils/authHandler";

type UserMeResponse = {
  id: string;
  email: string;
};

export default defineAuthEventHandler(async (_, { userId }) => {
  const user = await workos.userManagement.getUser(userId);

  return {
    id: userId,
    email: user.email,
  } satisfies UserMeResponse;
});
