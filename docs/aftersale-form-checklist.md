# Aftersale Form Feature Checklist

Based on `docs/aftersale-form.md` versus what is currently implemented in `form-kit/`.

## Core Form Behavior
- [x] Schema-driven form rendering
- [x] React Hook Form integration
- [x] Per-field default values in schema
- [x] Custom onSubmit handler
- [x] Form wrapper className prop
- [ ] Form title and form info props
- [ ] Before/after save hooks (onBeforeSave/onAfterSave)
- [ ] Transform data before submit
- [ ] Permission-aware props (hasPermission - a function that returns a boolean)

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
- [ ] Secret text field type
- [ ] Checkbox group (multiple options)
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
- [ ] helpText
- [ ] icon
- [ ] readOnly / disabled
- [ ] hidden
- [ ] shouldHide (conditional rendering)
- [ ] getIsRequired (conditional required)
- [ ] row / column layout metadata
- [ ] dynamic options (getOptions)
- [ ] enum-backed options (use ENUM values to populate select options)
- [ ] section headers (titleBefore/descriptionBefore)
- [ ] custom components before/after fields
- [ ] input masks (behavioral masking)
- [ ] file constraints (accept/multiple/maxSize)

## Layout Options
- [ ] Row-based layout
- [ ] Column-based layout
- [ ] Responsive layout
- [x] Default single-column rendering

## Data Processing & Validation Pipeline
- [ ] Schema-based filtering (filter out hidden fields)
- [ ] Conditional required validation in pipeline