# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js application with Supabase backend for authentication and data storage. It uses the Next.js App Router pattern with TypeScript, Tailwind CSS, and shadcn/ui components.

## Common Development Commands

### Development
- `pnpm dev` - Start development server (runs Next.js and Supabase concurrently)
- `pnpm dev:next` - Start only Next.js development server
- `pnpm dev:supabase` - Start Supabase local development stack
- `pnpm dev:supabase:functions` - Start Supabase Edge Functions

### Build & Deploy
- `pnpm build` - Build the application for production
- `pnpm start` - Start production server

### Code Quality
- `pnpm lint` - Run Biome linter (check for issues)
- `pnpm lint:fix` - Run Biome linter and auto-fix issues
- `pnpm fmt` - Format code with Biome
- `pnpm preflight` - Run format, lint, and build (comprehensive check)
- `pnpm knip` - Remove unused dependencies

### Database Management
- `pnpm db:migrate` - Run database migrations and regenerate types
- `pnpm db:reset` - Reset local database and regenerate types
- `pnpm db:restart` - Stop and start Supabase
- `pnpm db:status` - Show Supabase service status
- `pnpm db:stop` - Stop Supabase services
- `pnpm db:test` - Run database tests
- `pnpm db:types` - Generate TypeScript types from Supabase schema

#### Declarative Schema Commands
- `supabase db diff --schema public --file <name>` - Generate migration from schema changes
- `supabase db push` - Deploy changes to remote database
- `supabase migration up` - Apply pending migrations locally

## Architecture

### Authentication System
The app uses Supabase Auth with cookie-based session management:
- **Client-side**: `lib/supabase/client.ts` - Browser client for client components
- **Server-side**: `lib/supabase/server.ts` - Server client for server components/actions
- **Proxy**: `lib/supabase/proxy.ts` - Proxy client for middleware

### File Structure
- `app/` - Next.js App Router pages and layouts
- `app/auth/` - Authentication pages (login, sign-up, password reset)
- `app/protected/` - Protected routes requiring authentication
- `components/` - Reusable React components
- `components/ui/` - shadcn/ui base components
- `components/tutorial/` - Tutorial-specific components
- `lib/` - Utility functions and Supabase clients
- `supabase/` - Supabase configuration, migrations, and functions

### Environment Setup
Required environment variables (copy from `.env.example`):
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` - Supabase publishable/anon key

## Code Style & Tools

- **Formatter**: Biome (uses tabs for indentation, double quotes)
- **Linter**: Biome with recommended rules
- **CSS**: Tailwind CSS with custom Tailwind directives support
- **UI Components**: shadcn/ui with Radix UI primitives
- **Theme**: next-themes for dark/light mode switching

## Database Schema Management

This project uses Supabase **declarative schemas** for database management. This approach focuses on declaring the desired end state rather than writing step-by-step migrations.

### Declarative Schema Workflow
1. **Define schema**: Create/modify SQL files in `supabase/schemas/` directory
2. **Generate migration**: Run `supabase db diff --schema public --file <migration_name>` 
3. **Review changes**: Check the generated migration in `supabase/migrations/`
4. **Apply locally**: Run `pnpm db:migrate` to test changes
5. **Deploy**: Use `supabase db push` to deploy to remote database

### Best Practices for Schema Changes
- Always append new columns to the end of tables (avoids messy diffs)
- Use descriptive migration file names
- Test migrations locally before deploying
- Keep schema files organized and focused on single concerns
- For complex data migrations, create separate migration files with custom SQL

### Database Change Sub-Agent
When making database changes, use the `database-schema` sub-agent which handles:
- Proper declarative schema workflow
- Migration generation and review
- Type regeneration after changes
- Best practice validation

## Development Notes

- Always create new Supabase server clients within each function (important for Fluid compute)
- Use absolute imports with `@/` prefix for components and lib files
- Database types are auto-generated in `lib/supabase-types.ts`
- Supabase functions share types via `supabase/functions/_shared/`