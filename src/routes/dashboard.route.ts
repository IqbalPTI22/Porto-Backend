// Serves a simple admin dashboard page for managing portfolio content.
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { Elysia } from "elysia";

const dashboardPath = resolve(process.cwd(), "public", "dashboard.html");

export const dashboardRoute = new Elysia()
  .get("/", () => {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/dashboard",
      },
    });
  })
  .get("/dashboard", async ({ set }) => {
    try {
      const html = await readFile(dashboardPath, "utf-8");
      return new Response(html, {
        status: 200,
        headers: {
          "content-type": "text/html; charset=utf-8",
        },
      });
    } catch {
      set.status = 500;
      return { message: "Dashboard file could not be loaded" };
    }
  });
