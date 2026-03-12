// Defines REST endpoints for skill resources.
import { Elysia, t } from "elysia";
import {
  createSkill,
  deleteSkill,
  getAllSkills,
  getSkillById,
  updateSkill,
} from "../controllers/skills.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const skillBodySchema = t.Object({
  name: t.String({ minLength: 1 }),
  level: t.String({ minLength: 1 }),
  category: t.String({ minLength: 1 }),
});

const skillUpdateBodySchema = t.Partial(skillBodySchema);

export const skillsRoute = new Elysia({ prefix: "/skills" })
  .get("/", async () => {
    const skills = await getAllSkills();
    return skills;
  })
  .get(
    "/:id",
    async ({ params, set }) => {
      const result = await getSkillById(params.id);
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
      const result = await createSkill(body);
      set.status = result.status;
      return result.body;
    },
    {
      beforeHandle: requireAuth,
      body: skillBodySchema,
    },
  )
  .put(
    "/:id",
    async ({ params, body, set }) => {
      const result = await updateSkill(params.id, body);
      set.status = result.status;
      return result.body;
    },
    {
      beforeHandle: requireAuth,
      params: t.Object({
        id: t.String(),
      }),
      body: skillUpdateBodySchema,
    },
  )
  .delete(
    "/:id",
    async ({ params, set }) => {
      const result = await deleteSkill(params.id);
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
