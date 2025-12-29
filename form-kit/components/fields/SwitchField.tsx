import { useFormContext, type RegisterOptions } from 'react-hook-form'

import { Switch } from '@/form-kit/components/units/switch'
import {
  Field,
  FieldError,
  FieldLabel,
} from '@/form-kit/components/fields/Field'
import type { FieldErrorMessage } from '@/form-kit/components/fields/types'

export type SwitchFieldProps = {
  fieldId: string
  label: string
  name: string
  defaultChecked?: boolean
  rules?: RegisterOptions
  errors?: FieldErrorMessage
}

export function SwitchField({
  fieldId,
  label,
  name,
  defaultChecked,
  rules,
  errors,
}: SwitchFieldProps) {
  const { register } = useFormContext()
  const registration = register(name, rules)

  return (
    <Field>
      <FieldLabel className="flex items-center gap-2" htmlFor={fieldId}>
        <Switch
          id={fieldId}
          defaultChecked={defaultChecked}
          aria-invalid={!!errors?.length}
          {...registration}
        />
        {label}
      </FieldLabel>
      <FieldError errors={errors} />
    </Field>
  )
}
