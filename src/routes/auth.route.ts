import { Elysia, t } from "elysia";
import { loginAdmin, setupAdmin } from "../controllers/auth.controller.js";

const setupBodySchema = t.Object({
  name: t.String({ minLength: 1 }),
  email: t.String({ format: "email" }),
  password: t.String({ minLength: 8 }),
});

const loginBodySchema = t.Object({
  email: t.String({ format: "email" }),
  password: t.String({ minLength: 1 }),
});

export const authRoute = new Elysia({ prefix: "/auth" })
  .post(
    "/setup",
    async ({ body, headers, set }) => {
      const result = await setupAdmin(body, headers["x-setup-key"]);
      set.status = result.status;
      return result.body;
    },
    {
      body: setupBodySchema,
      headers: t.Object({
        "x-setup-key": t.String({ minLength: 1 }),
      }),
    },
  )
  .post(
    "/login",
    async ({ body, set }) => {
      const result = await loginAdmin(body);
      set.status = result.status;
      return result.body;
    },
    {
      body: loginBodySchema,
    },
  );
