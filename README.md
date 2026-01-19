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

This guide covers deploying your Next.js app to Vercel and your Supabase backend to Supabase Cloud, with optional GitHub Actions CI/CD.

### 1. Supabase Production Setup

#### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note your project credentials from **Settings > API**:
   - **Project URL**: `https://<project-ref>.supabase.co`
   - **Anon/Publishable Key**: Used in the Next.js app
   - **Service Role Key**: Used for server-side operations (keep secret)
3. Note your **Project Reference ID** from **Settings > General** (the `<project-ref>` part of your URL)

#### Configure Redirect URLs

For authentication to work in production, you must configure allowed redirect URLs:

1. Go to **Authentication > URL Configuration** in your Supabase dashboard
2. Set **Site URL** to your production domain (e.g., `https://your-app.vercel.app`)
3. Add **Redirect URLs** for all environments where users will authenticate:
   ```
   https://your-app.vercel.app/**
   https://your-preview-urls.vercel.app/**
   http://localhost:3000/**
   ```

   > **Note**: Use wildcard patterns (`/**`) to allow all paths. Include localhost for local development against production Supabase.

### 2. Vercel Deployment

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add the following **Environment Variables** in the Vercel dashboard:

   | Variable | Value |
   |----------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://<project-ref>.supabase.co` |
   | `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Your Supabase anon/publishable key |

4. Deploy

> **Tip**: For preview deployments, Vercel generates unique URLs. Make sure to add a wildcard pattern for your Vercel preview URLs in Supabase's redirect URL configuration.

### 3. GitHub Actions CI/CD

This project includes GitHub Actions workflows for automated testing and Supabase deployment. To enable the Supabase deployment workflow:

#### Required Secrets

Add these in **GitHub > Settings > Secrets and variables > Actions > Secrets**:

| Secret | Description | How to Get |
|--------|-------------|------------|
| `SUPABASE_ACCESS_TOKEN` | Personal access token for Supabase CLI | Generate at [supabase.com/dashboard/account/tokens](https://supabase.com/dashboard/account/tokens) |
| `SUPABASE_PRODUCTION_DB_PASSWORD` | Your production database password | Set during project creation, or reset in **Settings > Database** |

#### Required Variables

Add these in **GitHub > Settings > Secrets and variables > Actions > Variables**:

| Variable | Description | How to Get |
|----------|-------------|------------|
| `SUPABASE_PROJECT_ID` | Your project reference ID | Found in **Settings > General** (e.g., `abcdefghijklmnop`) |
| `ALLOWED_ORIGINS` | The allowed origins for CORS | A comma-separated list of origins (e.g., `https://your-app.vercel.app,https://your-preview-urls.vercel.app,http://localhost:3000`) |

#### Adding Additional Secrets for Edge Functions

If your edge functions need environment variables (e.g., API keys), add them to the GitHub Secrets and Variables:

   ```yaml
   env:
     # ... existing env vars
     OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}

   # In the "Set Supabase secrets" step:
   - name: Set Supabase secrets
     run: |
       supabase secrets set OPENAI_API_KEY=${{ secrets.OPENAI_API_KEY }}
   ```

## License

MIT
