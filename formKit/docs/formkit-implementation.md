# FormKit Implementation Overview

## Overview

FormKit is a schema-driven form generator built on React Hook Form. The core of the implementation is `SchemaForm`, which renders fields based on a `FormSchema`, resolves validation rules, and wires layout and visibility logic.

## Module Map

- `formKit/schema/`
  - `fieldTypes.ts` defines `FieldType`.
  - `formTypes.ts` defines `FormFieldConfig`, `FormSchema`, `FormValuesFromSchema`, and `defineFormSchema`.
- `formKit/forms/SchemaForm.tsx`
  - The main renderer and lifecycle orchestrator.
- `formKit/registry/fieldRegistry.ts`
  - Maps each `FieldType` to a concrete field component.
- `formKit/components/`
  - Field components and building blocks (labels, inputs, layout wrappers).
- `formKit/utils/`
  - Shared helpers (`cn`) and input mask logic (`applyMask`).

## Render Pipeline

1. **Default values** are derived from schema entries with `defaultValue`.
2. **React Hook Form** is initialized with `useForm` and wrapped by `FormProvider`.
3. **Watched values** (`useWatch`) are used to resolve dynamic rules, options, and visibility.
4. **Fields are filtered** by visibility and permission checks.
5. **Field content is rendered** by dispatching `FieldType` to the correct component in `fieldRegistry`.
6. **Layout strategy** is inferred (free, row, or column) and applied.

## Core Functionality

### Validation and Required Rules

- Base validation comes from `rules` in the schema.
- `getIsRequired` dynamically sets `rules.required` based on current form values.
- Errors are pulled from `formState.errors` and passed to field components.

### Options Resolution

Select-like fields can resolve options in this order:
1. `getOptions({ values })` (dynamic)
2. `options` (static)
3. `enumOptions` (mapped to label/value pairs)

### Visibility and Permissions

- `hidden` or `shouldHide({ values })` removes a field from rendering.
- `permission` can be paired with `hasPermission` to gate fields by role.

### Layout Strategy

`SchemaForm` infers layout based on `row` and `column` metadata:

- **Row layout**: all visible fields have `row`.
- **Column layout**: all visible fields have `column`.
- **Free layout**: no row/column metadata, or mixed usage.

If row/column usage is inconsistent, a warning is logged and the form falls back to free layout.

### Custom Components

`FieldType.CUSTOM` renders a user-provided React component with access to:
- Field metadata (label, name, etc.)
- `react-hook-form` methods
- Errors for the field

### Input Masking

`InputField` and `SECRET_TEXT` support `mask` values. The `applyMask` helper enforces the mask on user input.

### Form Lifecycle Hooks

`SchemaForm` supports hooks to control the submit flow:

- `transformBeforeFormSubmit` for value normalization.
- `onBeforeSave` to block or allow submission.
- `onAfterSave` for post-submit side effects.

## Key Files

- `formKit/forms/SchemaForm.tsx`
- `formKit/schema/formTypes.ts`
- `formKit/schema/fieldTypes.ts`
- `formKit/registry/fieldRegistry.ts`

