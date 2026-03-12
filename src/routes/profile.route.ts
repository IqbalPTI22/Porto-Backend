// Defines REST endpoints for profile resources.
import { Elysia, t } from "elysia";
import {
  getProfile,
  updateProfile,
} from "../controllers/profile.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

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
  .get("/", async ({ set }) => {
    const result = await getProfile();
    set.status = result.status;
    return result.body;
  })
  .put(
    "/",
    async ({ body, set }) => {
      const result = await updateProfile(body);
      set.status = result.status;
      return result.body;
    },
    {
      beforeHandle: requireAuth,
      body: profileUpdateBodySchema,
    },
  );
