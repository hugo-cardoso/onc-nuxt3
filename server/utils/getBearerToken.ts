import type { H3Event } from "h3";

export const getBearerToken = (event: H3Event) => {
  const authHeader = getRequestHeader(event, "Authorization");

  if (!authHeader) return;

  return authHeader.split(" ").at(1)!;
};
