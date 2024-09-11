import { defineAuthEventHandler } from "@/server/utils/authHandler";
import { PLANS } from "@/server/constants";

import type { Plan } from "@/types/Plan";

export default defineAuthEventHandler(async () => {
  return PLANS as Plan[];
});
