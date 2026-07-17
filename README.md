# Tavern Chronicles

*A performance-focused full-stack blog built with **Next.js 16**, featuring server-rendered content, Server Actions, and a PostgreSQL backend.*

Tavern Chronicles was developed as part of the **Stratpoint Full-Stack Training Program (Weeks 3–4 Capabilities Showcase)** to demonstrate modern full-stack development using the latest Next.js architecture and best practices.

---

## Features

* Server-rendered blog posts
* Comment system powered by Server Actions
* Partial Prerendering (PPR)
* Neon Serverless PostgreSQL database
* Function-level caching with Next.js Cache Components
* Type-safe database access using Drizzle ORM
* Server-side validation with Zod
* Responsive fantasy-inspired UI
* Biome linting and TypeScript strict mode

---

## Tech Stack

| Category     | Technology                 |
| ------------ | -------------------------- |
| Framework    | Next.js 16 (App Router)    |
| Language     | TypeScript                 |
| Database     | Neon Serverless PostgreSQL |
| ORM          | Drizzle ORM v2             |
| Styling      | Tailwind CSS               |
| Validation   | Zod                        |
| Code Quality | Biome                      |
| Runtime      | Node.js + pnpm             |

---

## Getting Started

### Install Dependencies

Clone the repository and install the required packages.

```bash
pnpm install
```

### Configure Environment Variables

Create a `.env.local` file in the project root.

```ini
DATABASE_URL="postgres://username:password@host/database?sslmode=require"

ADMIN_SECRET="your-admin-password"
```

> `.env.local` is excluded from version control via `.gitignore`.

---

## Database Setup

Generate a migration after modifying `lib/db/schema.ts`.

```bash
pnpm drizzle-kit generate
```

Apply the migration to your database.

```bash
pnpm drizzle-kit migrate
```

To inspect the database locally:

```bash
pnpm db:studio
```

---

## Seed the Database

Populate the database with sample blog posts.

```bash
pnpm db:seed
```

The seed script creates three example chronicles:

* *The Forging of the One Ring*
* *Dúnedain Ranging Protocols*
* *The Battle Above the Gods Eye*

---

## ✅ Verification

Before committing changes, ensure formatting, type safety, and the production build all succeed.

```bash
pnpm biome check --write .
pnpm tsc --noEmit
pnpm build
```

Or run them together:

```bash
pnpm biome check --write . && pnpm tsc --noEmit && pnpm build
```

A successful production build should display `◐` indicators for routes utilizing **Partial Prerendering (PPR)**.

---

## 📁 Project Structure

```text
app/
├── blog/
│   ├── [slug]/
│   ├── actions.ts
│   └── page.tsx
├── layout.tsx
└── page.tsx

components/
lib/
├── db/
│   ├── schema.ts
│   └── index.ts
└── utils/

drizzle/
public/
```

---

## Architecture Highlights

* Server Components
* Server Actions
* Neon HTTP Driver
* Drizzle ORM
* Next.js Cache Components (`cacheTag()` and `cacheLife()`)
* Partial Prerendering (PPR)
* Zod validation

---

## License

Created for educational purposes as part of the **Stratpoint Full-Stack Training Program**.
