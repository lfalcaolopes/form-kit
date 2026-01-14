# FormKit Usage Guide

## Purpose

This guide helps new contributors use the FormKit public API to build schema-driven forms. It focuses on the `SchemaForm` component, schema definitions, and the core field configuration options.

## Public API Surface

These are the main exports from `formKit/`:

- `SchemaForm`
- `defineFormSchema`
- `FieldType`
- `LayoutStrategy`
- `FormFieldConfig`, `FormSchema`, `FormValuesFromSchema`
- Field components and units (if you need direct composition)

Example import:

```tsx
import {
  SchemaForm,
  FieldType,
  defineFormSchema,
  type FormValuesFromSchema,
} from '@/formKit'
```

## Basic Form Example

```tsx
import { SchemaForm, FieldType, defineFormSchema } from '@/formKit'

const contactSchema = defineFormSchema({
  fullName: {
    name: 'fullName',
    field: FieldType.INPUT,
    label: 'Full name',
    placeholder: 'Ada Lovelace',
    rules: { required: 'Name is required' },
  },
  email: {
    name: 'email',
    field: FieldType.INPUT,
    label: 'Email',
    type: 'email',
  },
  contactReason: {
    name: 'contactReason',
    field: FieldType.SELECT,
    label: 'Reason',
    options: [
      { label: 'Support', value: 'support' },
      { label: 'Sales', value: 'sales' },
    ],
  },
})

export function ContactForm() {
  return (
    <SchemaForm
      schema={contactSchema}
      onSubmit={(values) => {
        console.log(values)
      }}
    />
  )
}
```

## Schema Logic Fundamentals

A `FormSchema` is a record of field configs. Each field config includes:

- `name`: field path used by React Hook Form.
- `field`: `FieldType` used to render a component.
- `label`: field label text.
- `defaultValue`: used to build `useForm` defaults.
- `rules`: React Hook Form validation rules.
- `readOnly` / `disabled`: render state.
- `hidden` / `shouldHide`: visibility controls.
- `getIsRequired`: dynamic required evaluation.
- `row` / `column`: layout metadata.

### Conditional Visibility

```tsx
const schema = defineFormSchema({
  billingCompany: {
    name: 'billingCompany',
    field: FieldType.INPUT,
    label: 'Company',
    shouldHide: ({ values }) => !values.isBusiness,
  },
  isBusiness: {
    name: 'isBusiness',
    field: FieldType.SINGLE_CHECKBOX,
    label: 'Business account',
    defaultValue: false,
  },
})
```

### Dynamic Required Rules

```tsx
const schema = defineFormSchema({
  phone: {
    name: 'phone',
    field: FieldType.INPUT,
    label: 'Phone',
    getIsRequired: ({ values }) => values.contactPreference === 'phone',
  },
  contactPreference: {
    name: 'contactPreference',
    field: FieldType.RADIO,
    label: 'Preferred contact',
    options: [
      { label: 'Email', value: 'email' },
      { label: 'Phone', value: 'phone' },
    ],
  },
})
```

### Options: Static, Enum, or Dynamic

```tsx
const schema = defineFormSchema({
  status: {
    name: 'status',
    field: FieldType.SELECT,
    label: 'Status',
    enumOptions: {
      pending: 'pending',
      inReview: 'inReview',
      done: 'done',
    },
  },
  assignee: {
    name: 'assignee',
    field: FieldType.SELECT,
    label: 'Assignee',
    getOptions: ({ values }) =>
      values.team === 'design'
        ? [
            { label: 'Ana', value: 'ana' },
            { label: 'Cris', value: 'cris' },
          ]
        : [
            { label: 'Bea', value: 'bea' },
            { label: 'Jo', value: 'jo' },
          ],
  },
})
```

### Layout: Rows or Columns

```tsx
const schema = defineFormSchema({
  firstName: {
    name: 'firstName',
    field: FieldType.INPUT,
    label: 'First name',
    row: 0,
  },
  lastName: {
    name: 'lastName',
    field: FieldType.INPUT,
    label: 'Last name',
    row: 0,
  },
  notes: {
    name: 'notes',
    field: FieldType.TEXTAREA,
    label: 'Notes',
    row: 1,
  },
})
```

### Custom Field Components

```tsx
import type { CustomFieldComponentProps } from '@/formKit'

function RatingField({ fieldId, label, form }: CustomFieldComponentProps) {
  const value = form.watch('rating')
  return (
    <div>
      <label htmlFor={fieldId}>{label}</label>
      <div>Current rating: {value ?? 'n/a'}</div>
    </div>
  )
}

const schema = defineFormSchema({
  rating: {
    name: 'rating',
    field: FieldType.CUSTOM,
    label: 'Rating',
    component: RatingField,
  },
})
```

## Schema-Driven Values

Use `FormValuesFromSchema` to get types from your schema:

```tsx
type ContactValues = FormValuesFromSchema<typeof contactSchema>

function handleSubmit(values: ContactValues) {
  values.fullName
  values.contactReason
}
```

## Form Hooks and Permissions

`SchemaForm` supports optional hooks and permission checks:

- `transformBeforeFormSubmit`
- `onBeforeSave`
- `onAfterSave`
- `hasPermission`

Use these to normalize data, block invalid submissions, or tailor the form to a user's access level.

