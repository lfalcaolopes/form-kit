import type { ReactNode } from 'react'
import { useFormContext, useWatch, type RegisterOptions } from 'react-hook-form'

import { Select } from '@/formKit/components/units/select'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/formKit/components/fields/Field'
import { ReadOnlyField } from '@/formKit/components/fields/ReadOnlyField'
import type {
  FieldErrorMessage,
  FieldOption,
} from '@/formKit/components/fields/types'

export type SelectFieldProps = {
  fieldId: string
  label: string
  name: string
  helpText?: ReactNode
  icon?: ReactNode
  readOnly?: boolean
  disabled?: boolean
  options: FieldOption[]
  defaultValue?: string
  rules?: RegisterOptions
  errors?: FieldErrorMessage
}

export function SelectField({
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
}: SelectFieldProps) {
  const { register, control } = useFormContext()
  const registration = register(name, rules)
  const value = useWatch({ control, name })
  const resolvedValue = value ?? defaultValue
  const selectedLabel =
    options.find((option) => option.value === resolvedValue)?.label ?? ''

  if (readOnly) {
    return (
      <ReadOnlyField
        label={label}
        value={selectedLabel}
        helpText={helpText}
        icon={icon}
      />
    )
  }

  return (
    <Field data-disabled={disabled}>
      <FieldLabel htmlFor={fieldId}>
        {icon}
        {label}
      </FieldLabel>
      <FieldContent>
        <Select
          id={fieldId}
          defaultValue={defaultValue}
          disabled={disabled}
          aria-invalid={!!errors?.length}
          {...registration}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        {helpText && <FieldDescription>{helpText}</FieldDescription>}
        <FieldError errors={errors} />
      </FieldContent>
    </Field>
  )
}
