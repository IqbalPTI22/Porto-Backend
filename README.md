<h1 align="center">🚀 Portfolio Backend API</h1>

<p align="center">
   <b>Modern, robust, and blazing-fast backend for your portfolio dashboard.<br>
   Built with <a href="https://elysiajs.com/">ElysiaJS</a>, <a href="https://www.postgresql.org/">PostgreSQL</a>, and <a href="https://orm.drizzle.team/">Drizzle ORM</a>.</b>
</p>

---

## 🛠️ Tech Stack

- Node.js + TypeScript
- ElysiaJS (Express-style, ultra-fast web framework)
- PostgreSQL (Relational Database)
- Drizzle ORM (Type-safe SQL ORM)

---

## 📁 Folder Structure

- `src/controllers` — Business logic (CRUD)
- `src/routes` — REST endpoint definitions
- `src/database` — Database connection & seed
- `src/schema` — Drizzle table definitions
- `src/utils` — Utility helpers
- `index.ts` — App entry point

---

## 🔥 API Endpoints

### Projects
| Method | Endpoint           | Description         |
|--------|--------------------|--------------------|
| GET    | /projects          | List all projects  |
| GET    | /projects/:id      | Get project by ID  |
| POST   | /projects          | Create project     |
| PUT    | /projects/:id      | Update project     |
| DELETE | /projects/:id      | Delete project     |

### Skills
| Method | Endpoint           | Description         |
|--------|--------------------|--------------------|
| GET    | /skills            | List all skills    |
| GET    | /skills/:id        | Get skill by ID    |
| POST   | /skills            | Create skill       |
| PUT    | /skills/:id        | Update skill       |
| DELETE | /skills/:id        | Delete skill       |

### Profile
| Method | Endpoint           | Description         |
|--------|--------------------|--------------------|
| GET    | /profile           | List all profiles  |
| GET    | /profile/:id       | Get profile by ID  |
| POST   | /profile           | Create profile     |
| PUT    | /profile/:id       | Update profile     |
| DELETE | /profile/:id       | Delete profile     |

---

## 🚦 Quick Start & Installation

### Prerequisites
- Node.js v18+
- PostgreSQL (running locally or remote)

### 1. Clone the Repository

```bash
git clone https://github.com/IqbalPTI22/Porto-Backend.git
cd Porto-Backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

- Copy the example environment file:
   ```bash
   cp .env.example .env
   # or (Windows)
   copy .env.example .env
   ```
- Edit `.env` and set your `DATABASE_URL` to match your PostgreSQL instance.

### 4. Database Migration & Seeding

- Generate migration (if needed):
   ```bash
   npm run db:generate
   ```
- Push schema to PostgreSQL:
   ```bash
   npm run db:push
   ```
- (Optional) Seed initial data:
   ```bash
   npm run seed
   ```

### 5. Run the Server

```bash
npm run dev
```

Server will run at [http://localhost:3000](http://localhost:3000) by default.

---


## 🖥️ Dashboard

- Open `http://localhost:3000/dashboard` for a simple admin UI.
- The dashboard supports create, read, update, and delete for projects, skills, and profile.
- All dashboard actions directly call the backend API endpoints.

---

## ⚡ Frontend Integration

CORS is enabled by default, so you can connect your React/Vite frontend directly to this API.

---

## 🧪 Quick API Testing

- Use the `api-requests.http` file to try all endpoints (health + CRUD for projects/skills/profile).
- Start the server with `npm run dev`, then execute requests from your editor (VS Code recommended).
- Adjust variables like `@projectId`, `@skillId`, and `@profileId` as needed.

---

## 🤝 Contributing

Pull requests and issues are welcome!

---

> The dashboard frontend is a separate project and not included in this repository.
