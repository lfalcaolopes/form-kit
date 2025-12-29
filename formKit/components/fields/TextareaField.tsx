import { useFormContext, type RegisterOptions } from 'react-hook-form'

import { Textarea } from '@/formKit/components/units/textarea'
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from '@/formKit/components/fields/Field'
import type { FieldErrorMessage } from '@/formKit/components/fields/types'

export type TextareaFieldProps = {
  fieldId: string
  label: string
  name: string
  placeholder?: string
  rules?: RegisterOptions
  errors?: FieldErrorMessage
}

export function TextareaField({
  fieldId,
  label,
  name,
  placeholder,
  rules,
  errors,
}: TextareaFieldProps) {
  const { register } = useFormContext()
  const registration = register(name, rules)

  return (
    <Field>
      <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
      <FieldContent>
        <Textarea
          id={fieldId}
          placeholder={placeholder}
          aria-invalid={!!errors?.length}
          {...registration}
        />
        <FieldError errors={errors} />
      </FieldContent>
    </Field>
  )
}
