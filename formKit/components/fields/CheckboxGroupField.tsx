import type { ReactNode } from 'react'
import {
  useController,
  useFormContext,
  useWatch,
  type RegisterOptions,
} from 'react-hook-form'

import { Checkbox } from '@/formKit/components/units/checkbox'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/formKit/components/fields/Field'
import { ReadOnlyField } from '@/formKit/components/fields/ReadOnlyField'
import type {
  FieldErrorMessage,
  FieldOption,
} from '@/formKit/components/fields/types'

export type CheckboxGroupFieldProps = {
  fieldId: string
  label: string
  name: string
  helpText?: ReactNode
  icon?: ReactNode
  readOnly?: boolean
  disabled?: boolean
  options: FieldOption[]
  defaultValue?: string[]
  rules?: RegisterOptions
  errors?: FieldErrorMessage
}

export function CheckboxGroupField({
  fieldId,
  label,
  name,
  helpText,
  icon,
  readOnly,
  disabled,
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
  const watchedValue = useWatch({ control, name })

  const selectedValues = Array.isArray(watchedValue) ? watchedValue : []
  const selectedLabelList = options
    .filter((option) => selectedValues.includes(option.value))
    .map((option) => option.label)

  if (readOnly) {
    return (
      <ReadOnlyField
        label={label}
        value={selectedLabelList}
        helpText={helpText}
        icon={icon}
      />
    )
  }

  return (
    <FieldSet data-disabled={disabled}>
      <FieldLegend className={disabled ? 'opacity-50' : undefined}>
        <span className="inline-flex items-center gap-2">
          {icon}
          {label}
        </span>
      </FieldLegend>
      <FieldGroup data-slot="checkbox-group">
        {options.map((option) => {
          const optionId = `${fieldId}-${option.value}`
          const checked = selectedValues.includes(option.value)

          return (
            <Field key={optionId} orientation="horizontal">
              <FieldLabel
                className="flex items-center gap-2"
                htmlFor={optionId}
              >
                <Checkbox
                  id={optionId}
                  name={field.name}
                  value={option.value}
                  checked={checked}
                  disabled={disabled}
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
      {helpText && <FieldDescription>{helpText}</FieldDescription>}
      <FieldError errors={errors} />
    </FieldSet>
  )
}
