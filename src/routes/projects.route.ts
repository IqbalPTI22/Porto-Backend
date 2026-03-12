// Defines REST endpoints for project resources.
import { Elysia, t } from "elysia";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from "../controllers/projects.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const projectBodySchema = t.Object({
  title: t.String({ minLength: 1 }),
  description: t.String({ minLength: 1 }),
  imageUrl: t.String({ minLength: 1 }),
  projectUrl: t.String({ minLength: 1 }),
});

const projectUpdateBodySchema = t.Partial(projectBodySchema);

export const projectsRoute = new Elysia({ prefix: "/projects" })
  .get("/", async () => {
    const projects = await getAllProjects();
    return projects;
  })
  .get(
    "/:id",
    async ({ params, set }) => {
      const result = await getProjectById(params.id);
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
      const result = await createProject(body);
      set.status = result.status;
      return result.body;
    },
    {
      beforeHandle: requireAuth,
      body: projectBodySchema,
    },
  )
  .put(
    "/:id",
    async ({ params, body, set }) => {
      const result = await updateProject(params.id, body);
      set.status = result.status;
      return result.body;
    },
    {
      beforeHandle: requireAuth,
      params: t.Object({
        id: t.String(),
      }),
      body: projectUpdateBodySchema,
    },
  )
  .delete(
    "/:id",
    async ({ params, set }) => {
      const result = await deleteProject(params.id);
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
