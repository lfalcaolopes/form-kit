import type { HTMLInputTypeAttribute } from 'react'
import { useFormContext, type RegisterOptions } from 'react-hook-form'

import { Input } from '@/form-kit/components/units/input'
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from '@/form-kit/components/fields/Field'
import type { FieldErrorMessage } from '@/form-kit/components/fields/types'

export type InputFieldProps = {
  fieldId: string
  label: string
  name: string
  type?: HTMLInputTypeAttribute
  placeholder?: string
  mask?: string
  rules?: RegisterOptions
  errors?: FieldErrorMessage
}

export function InputField({
  fieldId,
  label,
  name,
  type,
  placeholder,
  mask,
  rules,
  errors,
}: InputFieldProps) {
  const { register } = useFormContext()
  const registration = register(name, rules)

  return (
    <Field>
      <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
      <FieldContent>
        <Input
          id={fieldId}
          type={type}
          placeholder={placeholder}
          data-mask={mask}
          aria-invalid={!!errors?.length}
          {...registration}
        />
        <FieldError errors={errors} />
      </FieldContent>
    </Field>
  )
}
