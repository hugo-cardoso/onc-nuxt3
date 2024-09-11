import { WorkOSJwtPayload } from "./types";

export const getExpirationTime = (payload: WorkOSJwtPayload) => {
  return payload.exp;
};
