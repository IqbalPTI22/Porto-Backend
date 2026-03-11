// Bootstraps Elysia app, CORS, routes, and global error handling.
import "dotenv/config";
import { cors } from "@elysiajs/cors";
import { node } from "@elysiajs/node";
import { Elysia } from "elysia";
import { dashboardRoute } from "./routes/dashboard.route.js";
import { profileRoute } from "./routes/profile.route.js";
import { projectsRoute } from "./routes/projects.route.js";
import { skillsRoute } from "./routes/skills.route.js";

const app = new Elysia({ adapter: node() })
  .use(
    cors({
      origin: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    }),
  )
  .use(dashboardRoute)
  .get("/health", () => ({ message: "Portfolio backend is running" }))
  .use(projectsRoute)
  .use(skillsRoute)
  .use(profileRoute)
  .onError(({ code, error, set }) => {
    const errorDetails =
      error instanceof Error ? error.message : "Unexpected error";

    if (code === "VALIDATION") {
      set.status = 400;
      return {
        message: "Validation failed",
        details: errorDetails,
      };
    }

    set.status = 500;
    return {
      message: "Internal server error",
      details: errorDetails,
    };
  })
  .all("*", ({ set }) => {
    set.status = 404;
    return { message: "Route not found" };
  });

const port = Number.parseInt(process.env.PORT ?? "3000", 10);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
