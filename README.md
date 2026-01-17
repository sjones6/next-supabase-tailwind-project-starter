# Next.js + Supabase Starter Kit

An opinionated starter kit for building full-stack applications with Next.js and Supabase.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Backend**: [Supabase](https://supabase.com/) (Auth, Database, Edge Functions)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) with Radix UI primitives
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Linter/Formatter**: [Biome](https://biomejs.dev/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes) for dark/light mode

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/installation)
- [Docker](https://www.docker.com/) (required for local Supabase)
- [Supabase CLI](https://supabase.com/docs/guides/cli)

## Getting Started

> **Using Claude Code?** Run `/agents` and use the `project-setup` agent to automate the setup process.

### 1. Clone and Install

```bash
git clone <repository-url>
cd <project-directory>
pnpm install
```

### 2. Start Local Supabase

Make sure Docker is running, then start the local Supabase stack:

```bash
supabase start
```

This will output your local credentials:

```
API URL: http://127.0.0.1:54321
Publishable Key: sb_publishable_xxx...
Secret Key: sb_secret_xxx...
```

The local stack includes:
- PostgreSQL database
- Auth server
- Storage server
- Edge Functions runtime
- Studio UI (accessible at http://127.0.0.1:54323)

### 3. Set Up Environment Variables

Environment variables must be configured in **two locations**:

**Next.js App** (`.env.local`):

```bash
cp .env.example .env.local
```

Update with your local credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxx...
```

**Edge Functions** (`supabase/functions/.env`):

```env
SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_ANON_KEY=sb_publishable_xxx...
SUPABASE_SERVICE_ROLE_KEY=sb_secret_xxx...
```

### 4. Start Development Server

```bash
pnpm dev:next
```

Or run both Supabase and Next.js concurrently:

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
.
├── app/                    # Next.js App Router
│   ├── auth/              # Authentication pages
│   │   ├── login/         # Login page
│   │   ├── sign-up/       # Sign up page
│   │   ├── forgot-password/
│   │   ├── update-password/
│   │   ├── confirm/       # Email confirmation handler
│   │   └── error/         # Auth error page
│   ├── protected/         # Protected routes (requires auth)
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui base components
│   └── *.tsx             # Application components
├── lib/                   # Utilities and Supabase clients
│   ├── supabase/         # Supabase client configurations
│   │   ├── client.ts     # Browser client
│   │   ├── server.ts     # Server client
│   │   └── proxy.ts      # Middleware client
│   ├── supabase-types.ts # Auto-generated database types
│   └── utils.ts          # Utility functions
├── supabase/             # Supabase configuration
│   ├── schemas/          # Declarative SQL schemas
│   ├── migrations/       # Database migrations
│   ├── functions/        # Edge Functions
│   │   └── _shared/      # Shared utilities for functions
│   ├── config.toml       # Supabase project config
│   └── seed.sql          # Database seed data
└── CLAUDE.md             # AI assistant instructions
```

## Commands

### Development

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Next.js and Supabase concurrently |
| `pnpm dev:next` | Start only Next.js development server |
| `pnpm dev:supabase` | Start local Supabase stack |
| `pnpm dev:supabase:functions` | Start Edge Functions server |

### Build & Production

| Command | Description |
|---------|-------------|
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm preflight` | Run format, lint, and build (pre-commit check) |

### Code Quality

| Command | Description |
|---------|-------------|
| `pnpm lint` | Check for linting issues |
| `pnpm lint:fix` | Auto-fix linting issues |
| `pnpm fmt` | Format code with Biome |
| `pnpm knip` | Find and remove unused dependencies |

### Database

| Command | Description |
|---------|-------------|
| `pnpm db:migrate` | Run migrations and regenerate types |
| `pnpm db:reset` | Reset database and regenerate types |
| `pnpm db:restart` | Stop and start Supabase |
| `pnpm db:status` | Show Supabase service status |
| `pnpm db:stop` | Stop Supabase services |
| `pnpm db:test` | Run database tests |
| `pnpm db:types` | Generate TypeScript types from schema |

## Database Schema Management

This project uses **declarative schemas** for database management. Instead of writing incremental migrations, you declare the desired end state in SQL files.

### Workflow

1. **Define schema**: Create or modify SQL files in `supabase/schemas/`

2. **Generate migration**:
   ```bash
   supabase db diff --schema public --file <migration_name>
   ```

3. **Review**: Check the generated migration in `supabase/migrations/`

4. **Apply locally**:
   ```bash
   pnpm db:migrate
   ```

5. **Deploy to production**:
   ```bash
   supabase db push
   ```

### Best Practices

- Always append new columns to the end of tables (avoids messy diffs)
- Use descriptive migration file names
- Test migrations locally before deploying
- Keep schema files focused on single concerns

## Authentication

The starter includes a complete authentication system with:

- Email/password sign up and login
- Password reset flow
- Email confirmation
- Protected routes
- Session management via cookies

### Supabase Client Usage

```typescript
// Client Components
import { createClient } from "@/lib/supabase/client";
const supabase = createClient();

// Server Components / Server Actions
import { createClient } from "@/lib/supabase/server";
const supabase = await createClient();
```

**Important**: Always create new Supabase server clients within each function. Do not store them in global variables.

## Code Style

This project uses [Biome](https://biomejs.dev/) for linting and formatting:

- **Indentation**: Tabs
- **Quotes**: Double quotes
- **Imports**: Auto-organized
- **Rules**: Biome recommended ruleset

Configuration is in `biome.json`.

## Adding UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/). To add new components:

```bash
npx shadcn@latest add <component-name>
```

Components are installed to `components/ui/`.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Supabase Production

1. Create a project at [supabase.com](https://supabase.com)
2. Link your local project:
   ```bash
   supabase link --project-ref <project-id>
   ```
3. Push migrations:
   ```bash
   supabase db push
   ```

## License

MIT
