import {
  useController,
  useFormContext,
  type RegisterOptions,
} from 'react-hook-form'

import { Checkbox } from '@/formKit/components/units/checkbox'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/formKit/components/fields/Field'
import type {
  FieldErrorMessage,
  FieldOption,
} from '@/formKit/components/fields/types'

export type CheckboxGroupFieldProps = {
  fieldId: string
  label: string
  name: string
  options: FieldOption[]
  defaultValue?: string[]
  rules?: RegisterOptions
  errors?: FieldErrorMessage
}

export function CheckboxGroupField({
  fieldId,
  label,
  name,
  options,
  defaultValue,
  rules,
  errors,
}: CheckboxGroupFieldProps) {
  const { control } = useFormContext()
  const { field } = useController({
    name,
    control,
    rules,
    defaultValue: defaultValue ?? [],
  })

  const selectedValues = Array.isArray(field.value) ? field.value : []

  return (
    <FieldSet>
      <FieldLegend>{label}</FieldLegend>
      <FieldGroup data-slot="checkbox-group">
        {options.map((option) => {
          const optionId = `${fieldId}-${option.value}`
          const checked = selectedValues.includes(option.value)

          return (
            <Field key={optionId} orientation="horizontal">
              <FieldLabel className="flex items-center gap-2" htmlFor={optionId}>
                <Checkbox
                  id={optionId}
                  name={field.name}
                  value={option.value}
                  checked={checked}
                  onChange={(event) => {
                    const nextValues = event.target.checked
                      ? [...selectedValues, option.value]
                      : selectedValues.filter((value) => value !== option.value)
                    field.onChange(nextValues)
                  }}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  aria-invalid={!!errors?.length}
                />
                {option.label}
              </FieldLabel>
            </Field>
          )
        })}
      </FieldGroup>
      <FieldError errors={errors} />
    </FieldSet>
  )
}
