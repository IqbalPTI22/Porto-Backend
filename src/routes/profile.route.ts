// Defines REST endpoints for profile resources.
import { Elysia, t } from "elysia";
import {
  createProfile,
  deleteProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
} from "../controllers/profile.controller.js";

const profileBodySchema = t.Object({
  fullName: t.String({ minLength: 1 }),
  headline: t.String({ minLength: 1 }),
  bio: t.String({ minLength: 1 }),
  email: t.String({ minLength: 1 }),
  location: t.String({ minLength: 1 }),
  avatarUrl: t.String({ minLength: 1 }),
});

const profileUpdateBodySchema = t.Partial(profileBodySchema);

export const profileRoute = new Elysia({ prefix: "/profile" })
  .get("/", async () => {
    const profiles = await getAllProfiles();
    return profiles;
  })
  .get(
    "/:id",
    async ({ params, set }) => {
      const result = await getProfileById(params.id);
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
      const result = await createProfile(body);
      set.status = result.status;
      return result.body;
    },
    {
      body: profileBodySchema,
    },
  )
  .put(
    "/:id",
    async ({ params, body, set }) => {
      const result = await updateProfile(params.id, body);
      set.status = result.status;
      return result.body;
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      body: profileUpdateBodySchema,
    },
  )
  .delete(
    "/:id",
    async ({ params, set }) => {
      const result = await deleteProfile(params.id);
      set.status = result.status;
      return result.body;
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    },
  );
