import type { Context } from "elysia";
import { verifyAccessToken } from "../utils/auth.js";

export const requireAuth = async ({
  headers,
  set,
}: Pick<Context, "headers" | "set">) => {
  const authorizationHeader = headers.authorization;

  if (!authorizationHeader?.startsWith("Bearer ")) {
    set.status = 401;
    return { message: "Missing or invalid authorization header" };
  }

  const token = authorizationHeader.slice(7).trim();
  const payload = await verifyAccessToken(token);

  if (!payload) {
    set.status = 401;
    return { message: "Invalid or expired token" };
  }
};
