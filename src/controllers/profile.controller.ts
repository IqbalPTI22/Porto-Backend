// Handles CRUD business logic for profile records.
import { eq } from "drizzle-orm";
import { db } from "../database/db.js";
import { profile } from "../schema/index.js";
import { getErrorMessage, parseNumericId } from "../utils/http.js";

type ProfilePayload = {
  fullName: string;
  headline: string;
  bio: string;
  email: string;
  location: string;
  avatarUrl: string;
};

export const getAllProfiles = async () => {
  try {
    const records = await db.select().from(profile);
    return records;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const getProfileById = async (id: string) => {
  const parsedId = parseNumericId(id);
  if (!parsedId) {
    return { status: 400, body: { message: "Invalid profile id" } };
  }

  try {
    const [record] = await db
      .select()
      .from(profile)
      .where(eq(profile.id, parsedId));

    if (!record) {
      return { status: 404, body: { message: "Profile not found" } };
    }

    return { status: 200, body: record };
  } catch (error) {
    return { status: 500, body: { message: getErrorMessage(error) } };
  }
};

export const createProfile = async (payload: ProfilePayload) => {
  try {
    const [created] = await db
      .insert(profile)
      .values({
        ...payload,
        updatedAt: new Date(),
      })
      .returning();

    return { status: 201, body: created };
  } catch (error) {
    return { status: 500, body: { message: getErrorMessage(error) } };
  }
};

export const updateProfile = async (
  id: string,
  payload: Partial<ProfilePayload>,
) => {
  const parsedId = parseNumericId(id);
  if (!parsedId) {
    return { status: 400, body: { message: "Invalid profile id" } };
  }

  if (Object.keys(payload).length === 0) {
    return { status: 400, body: { message: "At least one field is required" } };
  }

  try {
    const [updated] = await db
      .update(profile)
      .set({
        ...payload,
        updatedAt: new Date(),
      })
      .where(eq(profile.id, parsedId))
      .returning();

    if (!updated) {
      return { status: 404, body: { message: "Profile not found" } };
    }

    return { status: 200, body: updated };
  } catch (error) {
    return { status: 500, body: { message: getErrorMessage(error) } };
  }
};

export const deleteProfile = async (id: string) => {
  const parsedId = parseNumericId(id);
  if (!parsedId) {
    return { status: 400, body: { message: "Invalid profile id" } };
  }

  try {
    const [deleted] = await db
      .delete(profile)
      .where(eq(profile.id, parsedId))
      .returning();

    if (!deleted) {
      return { status: 404, body: { message: "Profile not found" } };
    }

    return { status: 200, body: { message: "Profile deleted successfully" } };
  } catch (error) {
    return { status: 500, body: { message: getErrorMessage(error) } };
  }
};
