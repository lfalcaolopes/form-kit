# FormKit

FormKit is a schema-driven form generator for React. It turns a typed schema into a fully wired React Hook Form with consistent field primitives, layout handling, and dynamic field behavior.

## Required Libraries

FormKit relies on the following runtime libraries used inside `formKit/`.

Core (required for the schema/form implementation):

- `react-hook-form`
- `class-variance-authority`, `clsx`, `tailwind-merge`
- Tailwind CSS must be set up in the host project before using FormKit.

Units only (used by `formKit/components/units/`, replaceable):

- `@radix-ui/react-label`, `@radix-ui/react-separator`, `@radix-ui/react-slot`

install commands:

```sh
npm install react-hook-form class-variance-authority clsx tailwind-merge
```

```sh
npm install @radix-ui/react-label @radix-ui/react-separator @radix-ui/react-slot
```

## Documentation Index

- `docs/formkit-implementation.md`
- `docs/formkit-usage.md`
- `docs/adding-new-field.md`
