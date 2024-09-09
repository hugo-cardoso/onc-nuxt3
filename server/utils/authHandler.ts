import type { EventHandler, EventHandlerRequest, H3Event } from "h3";
import { jwtVerify, createRemoteJWKSet } from "jose";

import { workos } from "./workos";
import { getBearerToken } from "./getBearerToken";

const jwksUrl = new URL(workos.userManagement.getJwksUrl(workos.clientId!));
const JWKS = createRemoteJWKSet(jwksUrl);

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
      const {
        payload: { sub, sid, exp },
      } = await jwtVerify<{ sid: string }>(accessToken, JWKS);

      if (exp! * 1000 < Date.now()) throw new Error("Token expired");

      return handler(event, { accessToken, userId: sub!, sessionId: sid });
    } catch (e) {
      return new Response("Unauthorized", { status: 401 });
    }
  });
