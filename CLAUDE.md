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

### Testing
- `pnpm test` - Run all tests (Next.js + database) concurrently
- `pnpm test:next` - Run Next.js/UI tests only (vitest)
- `pnpm test:db` - Run database tests only (pgTAP)

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

## Design System

This project emphasizes **compact, space-efficient designs** that maximize information density while maintaining usability.

### Component Sizing Philosophy

All components support a consistent size scale optimized for dense interfaces:
- **xs**: Extra small (h-7) - Minimal spacing, text-xs
- **sm**: Small (h-8) - Compact spacing, text-sm
- **default**: Default (h-9) - Standard spacing, text-sm/text-base
- **lg**: Large (h-10) - Spacious, text-base

### Component Size Variants

**Button** (`components/ui/button.tsx`)
```tsx
<Button size="xs">Extra Small</Button>     // h-7, px-2, text-xs
<Button size="sm">Small</Button>           // h-8, px-3, text-xs (recommended default)
<Button size="default">Default</Button>    // h-9, px-4, text-sm
<Button size="lg">Large</Button>           // h-10, px-8, text-base
<Button size="icon">Icon</Button>          // h-9, w-9
```

**Input** (`components/ui/input.tsx`)
```tsx
<Input size="xs" />      // h-7, px-2, text-xs
<Input size="sm" />      // h-8, px-2.5, text-sm (recommended default)
<Input size="default" /> // h-9, px-3, text-base md:text-sm
<Input size="lg" />      // h-10, px-4, text-base
```

**Label** (`components/ui/label.tsx`)
```tsx
<Label size="xs">Extra Small</Label>    // text-xs
<Label size="sm">Small</Label>          // text-sm (recommended default)
<Label size="default">Default</Label>   // text-sm
<Label size="lg">Large</Label>          // text-base
```

**Card** (`components/ui/card.tsx`)
- Default padding reduced from `p-6` to `p-4` for more compact layouts
- Override with className when more spacing is needed: `<CardHeader className="p-6">`

### Spacing Scale (Tailwind)

Use these spacing values consistently throughout the app:

**Component Gaps** (gap-*)
- `gap-1` (0.25rem / 4px) - Minimal, inline items
- `gap-1.5` (0.375rem / 6px) - Form field label-to-input
- `gap-2` (0.5rem / 8px) - Compact inline elements
- `gap-3` (0.75rem / 12px) - Compact section spacing
- `gap-4` (1rem / 16px) - Standard form field spacing
- `gap-6` (1.5rem / 24px) - Section breaks (use sparingly)

**Container Padding** (p-*)
- `p-2` / `px-2` / `py-2` (0.5rem / 8px) - Minimal containers
- `p-3` / `px-3` / `py-3` (0.75rem / 12px) - Compact containers
- `p-4` / `px-4` / `py-4` (1rem / 16px) - Standard containers (recommended default)
- `p-6` / `px-6` / `py-6` (1.5rem / 24px) - Spacious (avoid unless necessary)

### Typography Scale

**Headings**
- Page titles: `text-xl` (20px) or `text-2xl` (24px) for major pages
- Section headings: `text-lg` (18px) with `font-semibold`
- Subsection headings: `text-base` (16px) with `font-medium`

**Body Text**
- Primary: `text-sm` (14px) - default for most content
- Secondary/Meta: `text-xs` (12px) with `text-muted-foreground`
- Large body: `text-base` (16px) - use sparingly

**Links**
- Use `text-xs` or `text-sm` with `underline-offset-4 hover:underline`

### Layout Patterns

**Forms**
```tsx
<form>
  <div className="flex flex-col gap-4">
    <div className="grid gap-1.5">
      <Label htmlFor="field" size="sm">Label</Label>
      <Input id="field" size="sm" />
    </div>
  </div>
</form>
```

**Navigation**
```tsx
<nav className="h-12 border-b">
  <div className="flex items-center px-4 gap-4">
    {/* nav items */}
  </div>
</nav>
```

**Cards/Containers**
```tsx
<Card className="p-3">
  <div className="flex items-center justify-between gap-2">
    <span className="text-xs text-muted-foreground">Title</span>
    <Badge className="text-xs">Info</Badge>
  </div>
  <p className="text-lg font-semibold mt-1">Value</p>
</Card>
```

### Best Practices

1. **Default to compact**: Use `sm` size variants as the default for most UI elements
2. **Minimize gaps**: Prefer `gap-1.5`, `gap-2`, `gap-3`, `gap-4` over larger gaps
3. **Use semantic colors**: Always use `bg-background`, `text-foreground`, `text-muted-foreground` for dark mode compatibility
4. **Inline over stacked**: When practical, use `flex` with `items-center` for horizontal layouts
5. **Truncate overflow**: Use `truncate` class for text that might overflow
6. **Small text for metadata**: Use `text-xs text-muted-foreground` for secondary information
7. **Compact containers**: Default Card padding is `p-4` (reduced from `p-6`)

### Examples

See these files for compact design patterns:
- `/components/login-form.tsx` - Compact form layout
- `/components/sign-up-form.tsx` - Multi-field form with tight spacing
- `/components/auth-button.tsx` - Compact button group
- `/app/page.tsx` - Compact page layout

## Testing

**All features must include appropriate tests.** This includes:
- **UI/Component tests**: Vitest with React Testing Library for any new components or UI changes
- **Database tests**: pgTAP tests for any database schema changes, **including RLS policy verification**

### Next.js/UI Tests (Vitest)
This project uses **Vitest** with **React Testing Library** for UI testing.

**Test File Convention:**
- Place test files directly next to the file being tested
- Use the naming pattern `{filename}.test.ts` or `{filename}.test.tsx`
- Example: `components/ui/button.tsx` → `components/ui/button.test.tsx`
- Do NOT use a separate `__tests__` directory

**Testing Style - Table-Driven Tests:**
- Prefer table-driven tests using `it.each` for testing multiple scenarios
- Define test cases as a typed array of objects with descriptive properties
- Use named variables in the test callback for clarity

```tsx
const testCases: { name: string; value: number; expected: string }[] = [
  { name: "positive", value: 10, expected: "+10%" },
  { name: "negative", value: -5, expected: "-5%" },
  { name: "zero", value: 0, expected: "0%" },
];

it.each(testCases)(
  "displays $name change correctly",
  ({ value, expected }) => {
    render(<StatsCard change={value} />);
    expect(screen.getByText(expected)).toBeInTheDocument();
  }
);
```

### Database Tests (pgTAP)
Database tests use **pgTAP** and live in `supabase/tests/database/`.

**Test File Convention:**
- Place test files in `supabase/tests/database/`
- Use the naming pattern `{name}.test.sql`

**RLS Testing Requirements:**
- All database tests MUST verify RLS is enabled using `tests.rls_enabled()`
- Test that authenticated users can only access their own data
- Test that unauthenticated users cannot access protected data
- Test all CRUD operations against RLS policies

**Available Test Helpers** (from `tests` schema):
- `tests.create_supabase_user(identifier, email?, phone?, metadata?)` - Create test users
- `tests.get_supabase_uid(identifier)` - Get test user UUID
- `tests.authenticate_as(identifier)` - Simulate authenticated user
- `tests.authenticate_as_service_role()` - Simulate service role
- `tests.clear_authentication()` - Reset to anon role
- `tests.rls_enabled(schema, table?)` - Verify RLS is enabled
- `tests.freeze_time(timestamp)` / `tests.unfreeze_time()` - Time manipulation

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

## Before Completing Work

**Always run `pnpm preflight` before finishing any task.** This command runs formatting, linting, and builds to catch any issues. Fix all errors before considering work complete.

Checklist before completing a feature:
- [ ] Unit tests written and passing (`pnpm test:next`)
- [ ] Database tests written with RLS checks (`pnpm test:db`) - if applicable
- [ ] `pnpm preflight` passes with no errors

## Maintaining This Documentation

When developing, any new conventions, patterns, or best practices discovered should be codified:
- **Project-wide conventions**: Add to this `CLAUDE.md` file
- **Domain-specific patterns**: Add to the appropriate sub-agent configuration (e.g., database conventions go in the `database-schema` agent, UI patterns in the `ui-component-builder` agent)

This ensures institutional knowledge is preserved and consistently applied across future development sessions.