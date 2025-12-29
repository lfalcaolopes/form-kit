# Repository Guidelines

## Project Structure & Module Organization
- All reusable formKit code must live inside `formKit/` so it can be copied or added via git subtree.
- Keep `formKit/` modular: `formKit/components/` for UI primitives, `formKit/schema/` for config types, `formKit/forms/` for generators, and `formKit/utils/` for helpers.
- `src/` stays as the demo or host app, with `src/main.tsx` and `src/App.tsx` wiring up examples.
- Styles should be colocated with the owning module; shared styles can live in `formKit/styles/`.
- Public, unprocessed files are in `public/` (for example `public/vite.svg`).
- Build output is generated into `dist/` (ignored by ESLint and should not be committed).

## Build, Test, and Development Commands
- `npm run dev`: start the Vite dev server with HMR for local development.
- `npm run build`: type-check the project (`tsc -b`) and build production assets.
- `npm run preview`: serve the production build locally for a final smoke check.
- `npm run lint`: run ESLint across the repository.
- `npm test`: run Jest test suites (when configured).

## Coding Style & Naming Conventions
- TypeScript + React (TSX) with ES modules; keep imports at the top of the file.
- Follow the existing formatting: 2-space indentation, single quotes, and trailing semicolons omitted.
- Component files use PascalCase (for example `src/MyWidget.tsx`); hooks use `useX` naming.
- Prefer co-locating component styles in `src/` alongside the component (for example `App.tsx` + `App.css`).
- Favor pure functions for schema parsing, validation mapping, and data transforms to keep logic testable.

## Testing Guidelines
- Jest is the chosen test runner. Use it to test configuration parsing, field rendering decisions, and validation integration.
- Prefer use-case driven tests (for example "renders required email field with error message") over snapshot-only tests.
- Do not place tests inside `formKit/`; keep them in `src/` or a top-level `tests/` folder (for example `tests/formKit/renderer.test.tsx`).

## Commit & Pull Request Guidelines
- Use Conventional Commits (for example `feat: add schema-driven select`, `fix: handle empty options`).
- Keep commits focused and scoped to one logical change.

## Configuration Notes
- Tooling is driven by `vite.config.ts`, `tsconfig*.json`, and `eslint.config.js`.
- If you add new environment variables, document them in `README.md` and use the `VITE_` prefix.

## Architecture Overview
- The goal is a reusable internal formKit for React: schema-driven forms powered by React Hook Form, validation via Zod, and consistent UI with shadcn/ui + Tailwind.
- Keep modules free of app-specific routing, stores, or services; everything in `formKit/` must be portable.
- Provide minimal documentation on integrating the kit and extending components.
