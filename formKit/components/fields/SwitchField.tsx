import type { ReactNode } from 'react'
import { useFormContext, useWatch, type RegisterOptions } from 'react-hook-form'

import { Switch } from '@/formKit/components/units/switch'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/formKit/components/fields/Field'
import { ReadOnlyField } from '@/formKit/components/fields/ReadOnlyField'
import type { FieldErrorMessage } from '@/formKit/components/fields/types'

export type SwitchFieldProps = {
  fieldId: string
  label: string
  name: string
  helpText?: ReactNode
  icon?: ReactNode
  readOnly?: boolean
  disabled?: boolean
  defaultChecked?: boolean
  rules?: RegisterOptions
  errors?: FieldErrorMessage
}

export function SwitchField({
  fieldId,
  label,
  name,
  helpText,
  icon,
  readOnly,
  disabled,
  defaultChecked,
  rules,
  errors,
}: SwitchFieldProps) {
  const { register, control } = useFormContext()
  const registration = register(name, rules)
  const value = useWatch({ control, name })
  const resolvedValue =
    typeof value === 'boolean' ? value : (defaultChecked ?? false)
  const displayValue = resolvedValue ? 'On' : 'Off'

  if (readOnly) {
    return (
      <ReadOnlyField
        label={label}
        value={displayValue}
        helpText={helpText}
        icon={icon}
      />
    )
  }

  return (
    <Field data-disabled={disabled}>
      <FieldLabel className="flex items-center gap-2" htmlFor={fieldId}>
        <Switch
          id={fieldId}
          defaultChecked={defaultChecked}
          disabled={disabled}
          aria-invalid={!!errors?.length}
          {...registration}
        />
        {icon}
        {label}
      </FieldLabel>
      {helpText && <FieldDescription>{helpText}</FieldDescription>}
      <FieldError errors={errors} />
    </Field>
  )
}
