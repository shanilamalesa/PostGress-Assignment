# Postgres Fundamentals - CRM Backend

A CRM backend for managing leads, built with Node.js, Express, and PostgreSQL.

## Prerequisites

- Node.js v24+
- PostgreSQL

## Setup

1. Clone the repository
2. Install dependencies:

```bash
   cd packages/backend
   npm install
```

3. Create a `.env` file based on `.env.example`:

PG_HOST=localhost
PG_PORT=5432
PG_USER=crm_app
PG_PASSWORD=your_password
PG_DATABASE=crm_dev
PORT=3000

4. Make sure your Postgres database is running and the `crm_app` user exists.

## Running the server

```bash
npm run dev
```

## API Routes

| Method | Route            | Description               |
| ------ | ---------------- | ------------------------- |
| GET    | /api/leads       | List all leads            |
| GET    | /api/leads/:id   | Get a single lead         |
| PATCH  | /api/leads/:id   | Update a lead's status    |
| GET    | /api/leads/stats | Get leads stats by status |

Then commit it
git add README.md
git commit -m "docs: add README with setup instructions"
git push

## Authentication

JWT-based authentication with bcrypt password hashing.

| Method | Route         | Description          | Auth |
| ------ | ------------- | -------------------- | ---- |
| POST   | /auth/signup  | Register a new user  | No   |
| POST   | /auth/login   | Login and get tokens | No   |
| POST   | /auth/refresh | Get new access token | No   |
| GET    | /auth/me      | Get current user     | Yes  |

## Roles

| Role    | Permissions             |
| ------- | ----------------------- |
| admin   | See all leads           |
| manager | See all leads           |
| agent   | See only assigned leads |

## Features

- JWT authentication with refresh tokens
- bcrypt password hashing
- Role-based access control
- Row-scoped lead access
- Rate limiting on login
- React frontend with protected routes
- Integration tests

## Frontend Setup

```bash
cd packages/client
npm install
npm start
```

## Developer Setup

1. Clone the repository
2. Install dependencies from the root:

```bash
npm install
```

Husky hooks install automatically via the `prepare` script.

3. Commits are auto-formatted with Prettier via lint-staged.

4. Commit messages must follow conventional commits format:

eat: add login page
fix: correct date formatter
chore: update dependencies
docs: update README

Bad commit messages will be rejected automatically by commitlint.
