// Handles CRUD business logic for activity update records.
import { eq } from "drizzle-orm";
import { db } from "../database/db.js";
import { activityUpdates } from "../schema/index.js";
import { getErrorMessage, parseNumericId } from "../utils/http.js";

type ActivityUpdatePayload = {
  mediaType: "image" | "video";
  mediaUrl: string;
  title: string;
  caption: string;
  activityTime: string;
  uploadedBy: string;
};

export const getAllActivityUpdates = async () => {
  try {
    const records = await db.select().from(activityUpdates);
    return records;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const getActivityUpdateById = async (id: string) => {
  const parsedId = parseNumericId(id);
  if (!parsedId) {
    return { status: 400, body: { message: "Invalid activity update id" } };
  }

  try {
    const [record] = await db
      .select()
      .from(activityUpdates)
      .where(eq(activityUpdates.id, parsedId));

    if (!record) {
      return { status: 404, body: { message: "Activity update not found" } };
    }

    return { status: 200, body: record };
  } catch (error) {
    return { status: 500, body: { message: getErrorMessage(error) } };
  }
};

export const createActivityUpdate = async (payload: ActivityUpdatePayload) => {
  try {
    const [created] = await db
      .insert(activityUpdates)
      .values({
        ...payload,
        activityTime: new Date(payload.activityTime),
        updatedAt: new Date(),
      })
      .returning();

    return { status: 201, body: created };
  } catch (error) {
    return { status: 500, body: { message: getErrorMessage(error) } };
  }
};

export const updateActivityUpdate = async (
  id: string,
  payload: Partial<ActivityUpdatePayload>,
) => {
  const parsedId = parseNumericId(id);
  if (!parsedId) {
    return { status: 400, body: { message: "Invalid activity update id" } };
  }

  if (Object.keys(payload).length === 0) {
    return { status: 400, body: { message: "At least one field is required" } };
  }

  const updateValues = {
    ...payload,
    updatedAt: new Date(),
  } as {
    mediaType?: "image" | "video";
    mediaUrl?: string;
    title?: string;
    caption?: string;
    activityTime?: Date;
    uploadedBy?: string;
    updatedAt: Date;
  };

  if (payload.activityTime) {
    updateValues.activityTime = new Date(payload.activityTime);
  }

  try {
    const [updated] = await db
      .update(activityUpdates)
      .set(updateValues)
      .where(eq(activityUpdates.id, parsedId))
      .returning();

    if (!updated) {
      return { status: 404, body: { message: "Activity update not found" } };
    }

    return { status: 200, body: updated };
  } catch (error) {
    return { status: 500, body: { message: getErrorMessage(error) } };
  }
};

export const deleteActivityUpdate = async (id: string) => {
  const parsedId = parseNumericId(id);
  if (!parsedId) {
    return { status: 400, body: { message: "Invalid activity update id" } };
  }

  try {
    const [deleted] = await db
      .delete(activityUpdates)
      .where(eq(activityUpdates.id, parsedId))
      .returning();

    if (!deleted) {
      return { status: 404, body: { message: "Activity update not found" } };
    }

    return {
      status: 200,
      body: { message: "Activity update deleted successfully" },
    };
  } catch (error) {
    return { status: 500, body: { message: getErrorMessage(error) } };
  }
};
