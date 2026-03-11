# Portfolio Backend (ElysiaJS + PostgreSQL + Drizzle)

Backend modern untuk aplikasi portfolio dengan admin dashboard. Fokus pada API CRUD untuk data project, skill, dan profile.

## Tech Stack

- Node.js + TypeScript
- ElysiaJS
- PostgreSQL
- Drizzle ORM

## Struktur Folder

- src/controllers: Business logic CRUD
- src/routes: Definisi endpoint REST
- src/database: Koneksi database
- src/schema: Definisi tabel Drizzle
- src/utils: Helper utilitas
- index.ts: Entry point aplikasi

## Endpoint API

### Projects

- GET /projects
- GET /projects/:id
- POST /projects
- PUT /projects/:id
- DELETE /projects/:id

### Skills

- GET /skills
- GET /skills/:id
- POST /skills
- PUT /skills/:id
- DELETE /skills/:id

### Profile

- GET /profile
- GET /profile/:id
- POST /profile
- PUT /profile/:id
- DELETE /profile/:id

## Setup

1. Install dependency
   - npm install
2. Salin environment file
   - copy .env.example .env
3. Isi DATABASE_URL di .env
4. Generate migration
   - npm run db:generate
5. Push schema ke PostgreSQL
   - npm run db:push

## Menjalankan Server

- Development: npm run dev
- Build: npm run build
- Start production: npm run start

Server berjalan di http://localhost:3000 secara default.

## Dashboard Sederhana

- Buka `http://localhost:3000/dashboard` untuk UI admin sederhana.
- Dashboard dapat melakukan create, read, update, dan delete untuk projects, skills, dan profile.
- Semua aksi di dashboard langsung memanggil endpoint backend yang sama.

## Koneksi Frontend React

CORS sudah diaktifkan pada server sehingga API dapat diakses dari frontend React/Vite.

## Testing CRUD Cepat

- Gunakan file `api-requests.http` untuk mencoba semua endpoint (health + CRUD projects/skills/profile).
- Jalankan server dulu dengan `npm run dev`, lalu eksekusi request satu per satu dari editor.
- Ubah variabel `@projectId`, `@skillId`, dan `@profileId` sesuai data yang ada di database.
