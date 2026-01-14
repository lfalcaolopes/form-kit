# Use FormKit

- Import from `@/formKit` (`SchemaForm`, `FieldType`, `defineFormSchema`, and types).
- Define schemas with `defineFormSchema({ ... })`; each entry needs `name`, `field`, `label`.
- Use `FormSchema` keys as field names and keep `name` in sync with the key.
- Submit with `SchemaForm` and `onSubmit(values)`; values are typed with `FormValuesFromSchema<typeof schema>`.
- Dynamic behavior: `shouldHide`, `getIsRequired`, and `getOptions({ values })` rely on `useWatch`.
- Options: use `options`, `enumOptions`, or `getOptions` for select/radio/checkbox.
