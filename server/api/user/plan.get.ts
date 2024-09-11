import { defineAuthEventHandler } from "@/server/utils/authHandler";
import { getJwtData } from "~/server/utils/workos/jwt/get-jwt-data";

import { PLANS } from "@/server/constants";
import type { Plan } from "@/types/Plan";

export default defineAuthEventHandler(async (_, { accessToken }) => {
  const { role } = await getJwtData(accessToken);

  const plan = PLANS.find((plan) => plan.id === role);

  return plan as Plan;
});
