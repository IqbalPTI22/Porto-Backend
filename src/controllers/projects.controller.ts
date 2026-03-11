// Handles CRUD business logic for project records.
import { eq } from "drizzle-orm";
import { db } from "../database/db.js";
import { projects } from "../schema/index.js";
import { getErrorMessage, parseNumericId } from "../utils/http.js";

type ProjectPayload = {
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
};

export const getAllProjects = async () => {
  try {
    const records = await db.select().from(projects);
    return records;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const getProjectById = async (id: string) => {
  const parsedId = parseNumericId(id);
  if (!parsedId) {
    return { status: 400, body: { message: "Invalid project id" } };
  }

  try {
    const [record] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, parsedId));

    if (!record) {
      return { status: 404, body: { message: "Project not found" } };
    }

    return { status: 200, body: record };
  } catch (error) {
    return { status: 500, body: { message: getErrorMessage(error) } };
  }
};

export const createProject = async (payload: ProjectPayload) => {
  try {
    const [created] = await db
      .insert(projects)
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

export const updateProject = async (
  id: string,
  payload: Partial<ProjectPayload>,
) => {
  const parsedId = parseNumericId(id);
  if (!parsedId) {
    return { status: 400, body: { message: "Invalid project id" } };
  }

  if (Object.keys(payload).length === 0) {
    return { status: 400, body: { message: "At least one field is required" } };
  }

  try {
    const [updated] = await db
      .update(projects)
      .set({
        ...payload,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, parsedId))
      .returning();

    if (!updated) {
      return { status: 404, body: { message: "Project not found" } };
    }

    return { status: 200, body: updated };
  } catch (error) {
    return { status: 500, body: { message: getErrorMessage(error) } };
  }
};

export const deleteProject = async (id: string) => {
  const parsedId = parseNumericId(id);
  if (!parsedId) {
    return { status: 400, body: { message: "Invalid project id" } };
  }

  try {
    const [deleted] = await db
      .delete(projects)
      .where(eq(projects.id, parsedId))
      .returning();

    if (!deleted) {
      return { status: 404, body: { message: "Project not found" } };
    }

    return { status: 200, body: { message: "Project deleted successfully" } };
  } catch (error) {
    return { status: 500, body: { message: getErrorMessage(error) } };
  }
};
