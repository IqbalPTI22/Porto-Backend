import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "../database/db.js";
import { adminUsers } from "../schema/index.js";
import { createAccessToken } from "../utils/auth.js";
import { getErrorMessage } from "../utils/http.js";

type SetupAdminPayload = {
  name: string;
  email: string;
  password: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

export const setupAdmin = async (
  payload: SetupAdminPayload,
  providedSetupKey: string | undefined,
) => {
  const expectedSetupKey = process.env.ADMIN_SETUP_KEY;

  if (!expectedSetupKey) {
    return {
      status: 500,
      body: { message: "ADMIN_SETUP_KEY is not configured on server" },
    };
  }

  if (!providedSetupKey || providedSetupKey !== expectedSetupKey) {
    return { status: 401, body: { message: "Invalid setup key" } };
  }

  try {
    const [existingAdmin] = await db.select().from(adminUsers).limit(1);

    if (existingAdmin) {
      return {
        status: 409,
        body: { message: "Admin account already exists" },
      };
    }

    const passwordHash = await bcrypt.hash(payload.password, 12);

    const [createdAdmin] = await db
      .insert(adminUsers)
      .values({
        name: payload.name,
        email: payload.email,
        passwordHash,
        updatedAt: new Date(),
      })
      .returning({
        id: adminUsers.id,
        name: adminUsers.name,
        email: adminUsers.email,
      });

    return {
      status: 201,
      body: {
        message: "Admin account created successfully",
        admin: createdAdmin,
      },
    };
  } catch (error) {
    return { status: 500, body: { message: getErrorMessage(error) } };
  }
};

export const loginAdmin = async (payload: LoginPayload) => {
  try {
    const [admin] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.email, payload.email));

    if (!admin) {
      return { status: 401, body: { message: "Invalid email or password" } };
    }

    const passwordIsValid = await bcrypt.compare(
      payload.password,
      admin.passwordHash,
    );

    if (!passwordIsValid) {
      return { status: 401, body: { message: "Invalid email or password" } };
    }

    const accessToken = await createAccessToken({
      sub: String(admin.id),
      email: admin.email,
      role: "admin",
    });

    return {
      status: 200,
      body: {
        accessToken,
        tokenType: "Bearer",
        expiresIn: "12h",
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
        },
      },
    };
  } catch (error) {
    return { status: 500, body: { message: getErrorMessage(error) } };
  }
};
