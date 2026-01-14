# Adding a New Field to FormKit

This guide explains how to introduce a new field type end-to-end: schema typing, registry wiring, and the render surface.

## 1) Define the Field Type

Add a new entry to `FieldType` in `formKit/schema/fieldTypes.ts`.

Example:

```ts
export const FieldType = {
  // ...
  DATE: 'date',
} as const
```

## 2) Add Schema Types

Update `formKit/schema/formTypes.ts`:

1. Extend `FieldValueByType` with the new type mapping.
2. Add a new field config type (similar to `InputFieldConfig`).
3. Add it to the `FormFieldConfig` union.

Example:

```ts
type FieldValueByType = {
  // ...
  [FieldType.DATE]: string
}

type DateFieldConfig = BaseFieldConfig<string> & {
  field: typeof FieldType.DATE
  placeholder?: string
}

export type FormFieldConfig =
  | InputFieldConfig
  // ...
  | DateFieldConfig
```

## 3) Build the Field Component

Create a field component under `formKit/components/fields/`.

Example: `formKit/components/fields/DateField.tsx`

Use the existing field patterns: `Field`, `FieldLabel`, `FieldContent`,
`FieldDescription`, and `FieldError`. For simple inputs, follow
`formKit/components/fields/InputField.tsx` as a template.

## 4) Export the Field

Export the new field from `formKit/components/fields/index.ts`.

```ts
export { DateField } from './DateField'
```

## 5) Register the Field

Update `formKit/registry/fieldRegistry.ts`:

1. Add a `FieldComponentProps` entry for the new field type.
2. Map the new field type to the component.

Example:

```ts
type FieldComponentProps = {
  // ...
  date: ComponentProps<typeof DateField>
}

export const fieldRegistry = {
  // ...
  date: DateField,
}
```

## 6) Render the Field in SchemaForm

Update `formKit/forms/SchemaForm.tsx` to handle the new `FieldType`:

- Add a `field.field === FieldType.DATE` branch.
- Resolve any options or props required by the new field.

Example:

```tsx
if (field.field === FieldType.DATE) {
  const DateField = fieldRegistry[FieldType.DATE]
  return (
    <DateField
      fieldId={fieldId}
      name={fieldName}
      label={field.label}
      placeholder={field.placeholder}
      rules={fieldRules}
      errors={fieldErrors}
    />
  )
}
```

## 7) Use the Field in a Schema

```ts
const schema = defineFormSchema({
  startDate: {
    name: 'startDate',
    field: FieldType.DATE,
    label: 'Start date',
    placeholder: 'YYYY-MM-DD',
  },
})
```

