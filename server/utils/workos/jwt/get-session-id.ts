import { WorkOSJwtPayload } from "./types";

export const getSessionId = (payload: WorkOSJwtPayload) => {
  return payload.sid;
};
