import type { HTMLInputTypeAttribute, ReactNode } from 'react'
import { useFormContext, useWatch, type RegisterOptions } from 'react-hook-form'

import { Input } from '@/formKit/components/units/input'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/formKit/components/fields/Field'
import { ReadOnlyField } from '@/formKit/components/fields/ReadOnlyField'
import type { FieldErrorMessage } from '@/formKit/components/fields/types'

export type InputFieldProps = {
  fieldId: string
  label: string
  name: string
  helpText?: ReactNode
  icon?: ReactNode
  readOnly?: boolean
  disabled?: boolean
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
  helpText,
  icon,
  readOnly,
  disabled,
  type,
  placeholder,
  mask,
  rules,
  errors,
}: InputFieldProps) {
  const { register, control } = useFormContext()
  const registration = register(name, rules)
  const value = useWatch({ control, name })
  const displayValue = value ?? ''

  if (readOnly) {
    return (
      <ReadOnlyField
        label={label}
        value={String(displayValue)}
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
        <Input
          id={fieldId}
          type={type}
          placeholder={placeholder}
          data-mask={mask}
          disabled={disabled}
          aria-invalid={!!errors?.length}
          {...registration}
        />
        {helpText && <FieldDescription>{helpText}</FieldDescription>}
        <FieldError errors={errors} />
      </FieldContent>
    </Field>
  )
}
