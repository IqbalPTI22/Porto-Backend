import { SignJWT, jwtVerify } from "jose";

export type AccessTokenPayload = {
  sub: string;
  email: string;
  role: "admin";
};

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("JWT_SECRET is required. Check your .env file.");
}

const secretKey = new TextEncoder().encode(jwtSecret);

export const createAccessToken = async (payload: AccessTokenPayload) => {
  return new SignJWT({ email: payload.email, role: payload.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(secretKey);
};

export const verifyAccessToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, secretKey);

    if (
      typeof payload.sub !== "string" ||
      typeof payload.email !== "string" ||
      payload.role !== "admin"
    ) {
      return null;
    }

    return {
      id: Number.parseInt(payload.sub, 10),
      email: payload.email,
      role: payload.role,
    };
  } catch {
    return null;
  }
};
