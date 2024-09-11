import type { EventHandler, EventHandlerRequest, H3Event } from "h3";

import { getJwtData } from "./workos/jwt/get-jwt-data";
import { getBearerToken } from "./getBearerToken";
import { getExpirationTime } from "./workos/jwt/get-expiration-time";
import { getSessionId } from "./workos/jwt/get-session-id";
import { getUserId } from "./workos/jwt/get-user-id";

type AuthEventHandler<T extends EventHandlerRequest> = (
  e: H3Event<T>,
  session: {
    userId: string;
    accessToken: string;
    sessionId: string;
  }
) => void;

export const defineAuthEventHandler = <T extends EventHandlerRequest, D>(
  handler: AuthEventHandler<T>
): EventHandler<T, D> =>
  defineEventHandler<T>(async (event) => {
    const accessToken = getBearerToken(event);

    if (!accessToken) throw new Error("No access token provided");

    try {
      const jwtData = await getJwtData(accessToken);
      const jwtExpTime = getExpirationTime(jwtData);
      const jwtSessionId = getSessionId(jwtData);
      const jwtUserId = getUserId(jwtData);

      if (jwtExpTime! * 1000 < Date.now()) throw new Error("Token expired");

      return handler(event, {
        accessToken,
        userId: jwtUserId!,
        sessionId: jwtSessionId,
      });
    } catch (e) {
      return new Response("Unauthorized", { status: 401 });
    }
  });
