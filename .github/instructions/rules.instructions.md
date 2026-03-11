---
description: |
  Load these instructions when the agent is asked to generate, modify, or review backend code
  for a portfolio project using ElysiaJS, Node.js, and PostgreSQL. These instructions guide
  the AI to follow project-specific coding standards, clean code principles, modular structure,
  and best practices for API design and database integration.

# applyTo: 'backend, elysiajs, nodejs, postgres, drizzle'
---

# Project Context

project:
name: Portfolio Backend
framework: ElysiaJS
language: TypeScript / Node.js
database: PostgreSQL
orm: Drizzle ORM
purpose: |
Provide a backend API for a portfolio website with an admin dashboard. Supports CRUD
operations for projects, skills, and profile data. Acts as a bridge between frontend
(React + Vite) and the database.

# Coding Guidelines

guidelines:

- Use **modular folder structure**:
  src/
  controllers/ # logic for handling requests
  routes/ # API route definitions
  database/ # DB connection and client
  schema/ # table schemas / models
  utils/ # helper functions
  index.ts # main server entry
- Follow **clean code principles**:
  - Clear, descriptive variable and function names
  - Minimal nesting
  - Consistent formatting
  - Modular functions
  - Comment only when necessary
- **Type safety**: Always type request bodies, responses, and database queries.
- **Error handling**: Return proper HTTP status codes and descriptive messages.
- **Validation**: Ensure required fields exist before database operations.
- **API design**:
  - RESTful endpoints
  - Example: GET /projects, POST /projects, PUT /projects/:id, DELETE /projects/:id
  - CORS enabled for frontend access
- **Database**:
  - Use Drizzle ORM for queries
  - Keep schema consistent with tables: projects, skills, profile
  - Store file URLs instead of actual file data
- **Environment**:
  - Use .env for DATABASE_URL and other secrets
  - Never hardcode credentials
- **Documentation**:
  - Include short README explaining setup, running, and connecting database
  - Comment controllers/routes with brief purpose
- **Clean code output**:
  - No unused imports or code
  - Avoid deeply nested callbacks (prefer async/await)
  - Separate concerns: routes ↔ controllers ↔ database
