import { workos } from "@/server/utils/workos";

import { defineAuthEventHandler } from "@/server/utils/authHandler";

export default defineAuthEventHandler(async (_, { sessionId }) => {
  await workos.userManagement.revokeSession({ sessionId });
});
