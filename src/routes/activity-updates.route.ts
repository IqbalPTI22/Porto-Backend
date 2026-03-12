// Defines REST endpoints for activity update resources.
import { Elysia, t } from "elysia";
import {
  createActivityUpdate,
  deleteActivityUpdate,
  getActivityUpdateById,
  getAllActivityUpdates,
  updateActivityUpdate,
} from "../controllers/activity-updates.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const activityUpdateBodySchema = t.Object({
  mediaType: t.Union([t.Literal("image"), t.Literal("video")]),
  mediaUrl: t.String({ minLength: 1 }),
  title: t.String({ minLength: 1 }),
  caption: t.String({ minLength: 1 }),
  activityTime: t.String({ format: "date-time" }),
  uploadedBy: t.String({ minLength: 1 }),
});

const activityUpdatePatchSchema = t.Partial(activityUpdateBodySchema);

export const activityUpdatesRoute = new Elysia({ prefix: "/activity-updates" })
  .get("/", async () => {
    const records = await getAllActivityUpdates();
    return records;
  })
  .get(
    "/:id",
    async ({ params, set }) => {
      const result = await getActivityUpdateById(params.id);
      set.status = result.status;
      return result.body;
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    },
  )
  .post(
    "/",
    async ({ body, set }) => {
      const result = await createActivityUpdate(body);
      set.status = result.status;
      return result.body;
    },
    {
      beforeHandle: requireAuth,
      body: activityUpdateBodySchema,
    },
  )
  .put(
    "/:id",
    async ({ params, body, set }) => {
      const result = await updateActivityUpdate(params.id, body);
      set.status = result.status;
      return result.body;
    },
    {
      beforeHandle: requireAuth,
      params: t.Object({
        id: t.String(),
      }),
      body: activityUpdatePatchSchema,
    },
  )
  .delete(
    "/:id",
    async ({ params, set }) => {
      const result = await deleteActivityUpdate(params.id);
      set.status = result.status;
      return result.body;
    },
    {
      beforeHandle: requireAuth,
      params: t.Object({
        id: t.String(),
      }),
    },
  );
