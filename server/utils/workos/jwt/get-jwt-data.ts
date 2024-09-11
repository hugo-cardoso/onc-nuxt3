import { createRemoteJWKSet, jwtVerify } from "jose";
import { workos } from "../";
import { WorkOSJwtPayload, WorkOSJwtCustomPayload } from "./types";

const jwksUrl = new URL(workos.userManagement.getJwksUrl(workos.clientId!));
const JWKS = createRemoteJWKSet(jwksUrl);

export const getJwtData = async (jwt: string): Promise<WorkOSJwtPayload> => {
  const { payload } = await jwtVerify<WorkOSJwtCustomPayload>(jwt, JWKS);
  return payload;
};
