# Aftersale Form Feature Checklist

Based on `docs/aftersale-form.md` versus what is currently implemented in `formKit/`.

## Core Form Behavior
- [x] Schema-driven form rendering
- [x] React Hook Form integration
- [x] Per-field default values in schema
- [x] Custom onSubmit handler
- [x] Form wrapper className prop
- [x] Form title and form info props
- [x] Before/after save hooks (onBeforeSave/onAfterSave)
- [x] Transform data before submit
- [x] Permission-aware props (hasPermission - a function that returns a boolean)

- [ ] Save bar behavior
- [ ] Watch handlers for field changes (possible to be done even with register)
- [ ] Dirty/validation gating options (ignoreFormDirtyCheck)

## Field Types
- [x] Input field (text/email/password/number/date/time via HTML input type)
- [x] Textarea
- [x] Select (single)
- [x] Radio group
- [x] Checkbox (single)
- [x] Switch (boolean)
- [x] Submit button field
- [x] Secret text field type
- [x] Checkbox group (multiple options)
- [ ] Custom component field (a way to manage custom single use components)

- [ ] File upload
- [ ] Multi-select
- [ ] Searchable multi-select
- [ ] Color picker
- [ ] Rich text editor

## Field Configuration
- [x] label
- [x] placeholder (Input, Textarea)
- [x] rules (React Hook Form validation)
- [x] static options (Select, Radio)
- [x] helpText
- [x] icon
- [x] readOnly / disabled
- [x] hidden
- [x] shouldHide (conditional rendering)
- [x] getIsRequired (conditional required)
- [x] row / column layout metadata
- [x] dynamic options (getOptions)
- [x] enum-backed options (use ENUM values to populate components with options)
- [x] section headers (titleBefore/descriptionBefore)
- [x] custom components before/after fields
- [x] input masks (behavioral masking)
- [x] input before/after inline components that renders in the begining or ending of the field
- [ ] file constraints (accept/multiple/maxSize)

## Layout Options
- [x] Row-based layout
- [x] Column-based layout
- [x] Responsive layout
- [x] Default single-column rendering

## Data Processing & Validation Pipeline
- [ ] Schema-based filtering (filter out hidden fields)
- [ ] Conditional required validation in pipeline
