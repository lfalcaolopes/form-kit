import type { ComponentType, ReactNode } from 'react'
import { useFormContext, type RegisterOptions } from 'react-hook-form'

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/formKit/components/fields/Field'
import type { FieldErrorMessage } from '@/formKit/components/fields/types'
import type { CustomFieldComponentProps } from '@/formKit/schema'

export type CustomFieldProps = {
  fieldId: string
  name: string
  label: string
  helpText?: ReactNode
  icon?: ReactNode
  readOnly?: boolean
  disabled?: boolean
  rules?: RegisterOptions
  component: ComponentType<CustomFieldComponentProps & Record<string, unknown>>
  componentProps?: Record<string, unknown>
  errors?: FieldErrorMessage
}

export function CustomField({
  fieldId,
  name,
  label,
  helpText,
  icon,
  readOnly,
  disabled,
  rules,
  component,
  componentProps,
  errors,
}: CustomFieldProps) {
  const form = useFormContext()
  const Component = component
  const resolvedProps = {
    ...(componentProps ?? {}),
    fieldId,
    name,
    label,
    helpText,
    icon,
    readOnly,
    disabled,
    rules,
    errors,
    form,
  } as CustomFieldComponentProps & Record<string, unknown>

  return (
    <Field data-disabled={disabled}>
      <FieldLabel htmlFor={fieldId}>
        {icon}
        {label}
      </FieldLabel>
      <FieldContent>
        <Component {...resolvedProps} />
        {helpText && <FieldDescription>{helpText}</FieldDescription>}
        <FieldError errors={errors} />
      </FieldContent>
    </Field>
  )
}
