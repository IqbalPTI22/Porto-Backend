// Handles singleton profile read/update business logic.
import { eq } from "drizzle-orm";
import { db } from "../database/db.js";
import { profile } from "../schema/index.js";
import { getErrorMessage } from "../utils/http.js";

type ProfilePayload = {
  fullName: string;
  headline: string;
  bio: string;
  email: string;
  location: string;
  avatarUrl: string;
};

export const getProfile = async () => {
  try {
    const [record] = await db.select().from(profile).limit(1);
    return { status: 200, body: record ?? null };
  } catch (error) {
    return { status: 500, body: { message: getErrorMessage(error) } };
  }
};

export const updateProfile = async (payload: Partial<ProfilePayload>) => {
  if (Object.keys(payload).length === 0) {
    return { status: 400, body: { message: "At least one field is required" } };
  }

  try {
    const [existing] = await db
      .select({ id: profile.id })
      .from(profile)
      .limit(1);

    if (!existing) {
      return {
        status: 404,
        body: {
          message: "Profile is not initialized yet",
        },
      };
    }

    const [updated] = await db
      .update(profile)
      .set({
        ...payload,
        updatedAt: new Date(),
      })
      .where(eq(profile.id, existing.id))
      .returning();

    return { status: 200, body: updated };
  } catch (error) {
    return { status: 500, body: { message: getErrorMessage(error) } };
  }
};
