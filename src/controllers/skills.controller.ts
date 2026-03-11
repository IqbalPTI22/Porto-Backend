// Handles CRUD business logic for skill records.
import { eq } from "drizzle-orm";
import { db } from "../database/db.js";
import { skills } from "../schema/index.js";
import { getErrorMessage, parseNumericId } from "../utils/http.js";

type SkillPayload = {
  name: string;
  level: string;
  category: string;
};

export const getAllSkills = async () => {
  try {
    const records = await db.select().from(skills);
    return records;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const getSkillById = async (id: string) => {
  const parsedId = parseNumericId(id);
  if (!parsedId) {
    return { status: 400, body: { message: "Invalid skill id" } };
  }

  try {
    const [record] = await db
      .select()
      .from(skills)
      .where(eq(skills.id, parsedId));

    if (!record) {
      return { status: 404, body: { message: "Skill not found" } };
    }

    return { status: 200, body: record };
  } catch (error) {
    return { status: 500, body: { message: getErrorMessage(error) } };
  }
};

export const createSkill = async (payload: SkillPayload) => {
  try {
    const [created] = await db
      .insert(skills)
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

export const updateSkill = async (
  id: string,
  payload: Partial<SkillPayload>,
) => {
  const parsedId = parseNumericId(id);
  if (!parsedId) {
    return { status: 400, body: { message: "Invalid skill id" } };
  }

  if (Object.keys(payload).length === 0) {
    return { status: 400, body: { message: "At least one field is required" } };
  }

  try {
    const [updated] = await db
      .update(skills)
      .set({
        ...payload,
        updatedAt: new Date(),
      })
      .where(eq(skills.id, parsedId))
      .returning();

    if (!updated) {
      return { status: 404, body: { message: "Skill not found" } };
    }

    return { status: 200, body: updated };
  } catch (error) {
    return { status: 500, body: { message: getErrorMessage(error) } };
  }
};

export const deleteSkill = async (id: string) => {
  const parsedId = parseNumericId(id);
  if (!parsedId) {
    return { status: 400, body: { message: "Invalid skill id" } };
  }

  try {
    const [deleted] = await db
      .delete(skills)
      .where(eq(skills.id, parsedId))
      .returning();

    if (!deleted) {
      return { status: 404, body: { message: "Skill not found" } };
    }

    return { status: 200, body: { message: "Skill deleted successfully" } };
  } catch (error) {
    return { status: 500, body: { message: getErrorMessage(error) } };
  }
};
