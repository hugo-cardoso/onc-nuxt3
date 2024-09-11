import { WorkOSJwtPayload } from "./types";

export const getUserId = (payload: WorkOSJwtPayload) => {
  return payload.sub;
};
