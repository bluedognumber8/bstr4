# Build/Lint/Test Commands
- Build: `pnpm build` (builds all workspaces)
- Lint: `cd apps/web && pnpm lint` (lints web app with ESLint)
- Test: No test scripts configured; add Jest/Vitest if needed
- Single test: N/A (no tests present)

# Code Style Guidelines
- Imports: Absolute with `@/` alias for web; relative for CMS
- Components: PascalCase, default export functions
- Variables/Functions: camelCase
- Types: TypeScript interfaces/types for props/params
- Styling: next-yak styled components for web
- Formatting: ESLint with next config (auto-fixes)
- Naming: Descriptive, consistent (e.g., Header, HomePage)
- Error Handling: try-catch for async ops; throw errors
- Structure: Flat exports in index.ts files