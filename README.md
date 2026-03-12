# Portfolio Backend API

Modern backend API for a portfolio admin dashboard, built with ElysiaJS, PostgreSQL, and Drizzle ORM.

## English (Main)

### 1. Overview

This repository provides a ready-to-run backend for portfolio content management:

- Projects CRUD
- Skills CRUD
- Profile singleton (edit only)
- Activity updates CRUD
- Admin authentication (setup + login)
- JWT-protected write endpoints
- Simple web dashboard with login page

The backend is designed so you can host your database on Supabase (PostgreSQL) while running this API on any Node.js host.

### 2. Tech Stack

- Node.js + TypeScript
- ElysiaJS
- PostgreSQL
- Drizzle ORM
- bcryptjs (password hashing)
- jose (JWT)

### 3. Project Structure

```text
.
|- index.ts                     # Root entrypoint
|- src/index.ts                # App bootstrap
|- src/controllers/            # Business logic
|- src/routes/                 # Route definitions
|- src/database/               # DB connection and seed
|- src/schema/                 # Drizzle schema
|- src/middlewares/            # Request middleware (auth)
|- src/utils/                  # Utility helpers
|- public/dashboard.html       # Dashboard UI
|- public/login.html           # Login UI
|- api-requests.http           # HTTP request collection
```

### 4. Prerequisites

- Node.js 18+
- npm
- PostgreSQL database (local or Supabase)

### 5. Installation

```bash
git clone https://github.com/IqbalPTI22/Porto-Backend.git
cd Porto-Backend
npm install
```

### 6. Environment Variables

Create `.env` from `.env.example`.

```bash
cp .env.example .env
```

Windows:

```powershell
copy .env.example .env
```

Required variables:

- `DATABASE_URL`: PostgreSQL connection string
- `PORT`: API port (default `3000`)
- `JWT_SECRET`: secret key to sign JWT tokens
- `ADMIN_SETUP_KEY`: one-time setup key to create first admin

Example:

```dotenv
DATABASE_URL=postgresql://postgres:your-password@your-host:5432/postgres
PORT=3000
JWT_SECRET=replace-with-long-random-secret
ADMIN_SETUP_KEY=replace-with-admin-setup-key
```

Security notes:

- Never commit `.env`.
- Use a long random value for `JWT_SECRET`.
- Use a simple parser-safe value for `ADMIN_SETUP_KEY` (avoid confusing characters in manual clients).

### 7. Database Setup

Push schema to database:

```bash
npm run db:push
```

Optional commands:

```bash
npm run db:generate
npm run db:seed
```

### 8. Run the App

Development mode:

```bash
npm run dev
```

Build and production run:

```bash
npm run build
npm run start
```

Health check:

- `GET /health`

### 9. Authentication Flow

#### Step A: One-time Admin Setup

Endpoint:

- `POST /auth/setup`

Headers:

- `Content-Type: application/json`
- `x-setup-key: <ADMIN_SETUP_KEY_FROM_ENV>`

Body:

```json
{
  "name": "Main Admin",
  "email": "admin@example.com",
  "password": "your-strong-password"
}
```

Possible responses:

- `201`: admin created
- `401`: invalid setup key
- `409`: admin already exists (setup already done)

#### Step B: Admin Login

Endpoint:

- `POST /auth/login`

Body:

```json
{
  "email": "admin@example.com",
  "password": "your-strong-password"
}
```

Success returns:

- `accessToken`
- `tokenType` (`Bearer`)
- `expiresIn`

#### Step C: Use Token for Protected Actions

For write endpoints (`POST`, `PUT`, `DELETE`) include:

```http
Authorization: Bearer <accessToken>
```

### 10. Dashboard and Login Pages

- Root (`/`) redirects to `/dashboard`
- Login page is available at `/login` and `/login.html`
- Dashboard UI is served at `/dashboard`

Frontend behavior:

- If no token is stored in browser localStorage, dashboard redirects to login page.
- Login page calls `/auth/login`, stores token, then redirects back to dashboard.
- API calls from dashboard include `Authorization` header automatically.

### 11. API Reference

#### Public Read Endpoints

- `GET /projects`
- `GET /projects/:id`
- `GET /skills`
- `GET /skills/:id`
- `GET /profile`
- `GET /activity-updates`
- `GET /activity-updates/:id`

#### Protected Write Endpoints

- `POST /projects`
- `PUT /projects/:id`
- `DELETE /projects/:id`
- `POST /skills`
- `PUT /skills/:id`
- `DELETE /skills/:id`
- `PUT /profile`
- `POST /activity-updates`
- `PUT /activity-updates/:id`
- `DELETE /activity-updates/:id`

#### Auth Endpoints

- `POST /auth/setup`
- `POST /auth/login`

### 12. Testing with api-requests.http

Use `api-requests.http` for quick manual testing:

1. Set `@setupKey`, `@adminEmail`, `@adminPassword`
2. Run setup request once
3. Run login request
4. Copy returned token into `@authToken`
5. Test protected CRUD requests

If your VS Code does not show Send Request above HTTP blocks, install REST Client extension.

### 13. Troubleshooting

#### Invalid setup key

- Verify `x-setup-key` exactly matches `ADMIN_SETUP_KEY` in `.env`
- Restart server after editing `.env`

#### Admin already exists

- Setup has already been completed
- Use `/auth/login` instead of `/auth/setup`

#### Missing or invalid authorization header

- Add `Authorization: Bearer <token>` for protected endpoints

#### Route not found

- Ensure URL is correct and server is running on expected port

#### Database connection error

- Check `DATABASE_URL`
- Ensure PostgreSQL/Supabase is reachable

### 14. Deployment Notes

- GitHub Pages cannot run this backend (static hosting only)
- Deploy backend to a Node-compatible host (Railway, Render, Fly.io, VPS, etc.)
- Keep secrets in deployment environment variables

### 15. Scripts

- `npm run dev`: run in watch mode
- `npm run build`: compile TypeScript
- `npm run start`: run compiled app
- `npm run db:generate`: generate Drizzle SQL
- `npm run db:push`: sync schema to DB
- `npm run db:seed`: seed data

### 16. Contributing

Contributions are welcome. For major changes, open an issue first to discuss what you want to change.

---

## Bahasa Indonesia

### 1. Ringkasan

Repository ini adalah backend untuk mengelola data portfolio:

- CRUD Projects
- CRUD Skills
- Profile tunggal (hanya edit)
- CRUD Activity Update
- Login admin (setup awal + login)
- Endpoint tulis dilindungi JWT
- Dashboard web sederhana + halaman login

### 2. Cara Menjalankan

```bash
git clone https://github.com/IqbalPTI22/Porto-Backend.git
cd Porto-Backend
npm install
```

Salin file environment:

```powershell
copy .env.example .env
```

Isi `.env`:

- `DATABASE_URL`
- `PORT`
- `JWT_SECRET`
- `ADMIN_SETUP_KEY`

Sinkronkan schema:

```bash
npm run db:push
```

Jalankan server:

```bash
npm run dev
```

### 3. Alur Login Admin

1. Jalankan `POST /auth/setup` sekali saja dengan header `x-setup-key`
2. Login via `POST /auth/login`
3. Gunakan `accessToken` untuk endpoint tulis:

```http
Authorization: Bearer <token>
```

Jika setup mengembalikan `409 Admin account already exists`, itu normal (admin sudah pernah dibuat).

### 4. Halaman Dashboard

- `/` redirect ke `/dashboard`
- `/login` atau `/login.html` untuk login
- Dashboard menyimpan token di localStorage
- Jika token tidak ada/invalid, user diarahkan ke login

### 5. Endpoint Utama

Endpoint baca (public):

- `GET /projects`, `GET /projects/:id`
- `GET /skills`, `GET /skills/:id`
- `GET /profile`
- `GET /activity-updates`, `GET /activity-updates/:id`

Endpoint tulis (wajib token):

- `POST/PUT/DELETE` untuk `projects`, `skills`, `activity-updates`
- `PUT /profile` untuk edit profile tunggal

Endpoint auth:

- `POST /auth/setup`
- `POST /auth/login`

### 6. Troubleshooting Singkat

- `Invalid setup key`: cek `x-setup-key` sama persis dengan `ADMIN_SETUP_KEY`, lalu restart server
- `Missing or invalid authorization header`: token belum dikirim
- `Route not found`: cek URL dan port

### 7. Catatan Deploy

- Backend ini tidak bisa dijalankan di GitHub Pages
- Gunakan host backend seperti Railway/Render/Fly.io/VPS
- Simpan semua secret di environment variable platform deploy
