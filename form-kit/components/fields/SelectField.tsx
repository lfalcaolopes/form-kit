import { useFormContext, type RegisterOptions } from 'react-hook-form'

import { Select } from '@/form-kit/components/units/select'
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from '@/form-kit/components/fields/Field'
import type {
  FieldErrorMessage,
  FieldOption,
} from '@/form-kit/components/fields/types'

export type SelectFieldProps = {
  fieldId: string
  label: string
  name: string
  options: FieldOption[]
  defaultValue?: string
  rules?: RegisterOptions
  errors?: FieldErrorMessage
}

export function SelectField({
  fieldId,
  label,
  name,
  options,
  defaultValue,
  rules,
  errors,
}: SelectFieldProps) {
  const { register } = useFormContext()
  const registration = register(name, rules)

  return (
    <Field>
      <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
      <FieldContent>
        <Select
          id={fieldId}
          defaultValue={defaultValue}
          aria-invalid={!!errors?.length}
          {...registration}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <FieldError errors={errors} />
      </FieldContent>
    </Field>
  )
}
