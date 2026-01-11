import type { ReactNode } from 'react'
import { useFormContext, useWatch, type RegisterOptions } from 'react-hook-form'

import { Textarea } from '@/formKit/components/units/textarea'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/formKit/components/fields/Field'
import { ReadOnlyField } from '@/formKit/components/fields/ReadOnlyField'
import type { FieldErrorMessage } from '@/formKit/components/fields/types'

export type TextareaFieldProps = {
  fieldId: string
  label: string
  name: string
  helpText?: ReactNode
  icon?: ReactNode
  readOnly?: boolean
  disabled?: boolean
  placeholder?: string
  rules?: RegisterOptions
  errors?: FieldErrorMessage
}

export function TextareaField({
  fieldId,
  label,
  name,
  helpText,
  icon,
  readOnly,
  disabled,
  placeholder,
  rules,
  errors,
}: TextareaFieldProps) {
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
        <Textarea
          id={fieldId}
          placeholder={placeholder}
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
