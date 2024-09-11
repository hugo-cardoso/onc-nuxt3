import type { JWTPayload } from "jose";

export type WorkOSJwtCustomPayload = {
  sid: string;
  role: string;
  permissions: string[];
};

export type WorkOSJwtPayload = WorkOSJwtCustomPayload & JWTPayload;
