# Add a New Field

- Add a `FieldType` entry in `formKit/schema/fieldTypes.ts`.
- Extend `FieldValueByType` and `FormFieldConfig` in `formKit/schema/formTypes.ts`.
- Create the field component in `formKit/components/fields/` using the existing Field primitives.
- Export it in `formKit/components/fields/index.ts`.
- Register it in `formKit/registry/fieldRegistry.ts` (props + mapping).
- Handle it in `formKit/forms/SchemaForm.tsx` with a new render branch.
- Add docs/tests outside `formKit/` if needed.
