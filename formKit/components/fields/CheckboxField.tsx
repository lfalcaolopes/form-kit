import { useFormContext, type RegisterOptions } from 'react-hook-form'

import { Checkbox } from '@/formKit/components/units/checkbox'
import {
  Field,
  FieldError,
  FieldLabel,
} from '@/formKit/components/fields/Field'
import type { FieldErrorMessage } from '@/formKit/components/fields/types'

export type CheckboxFieldProps = {
  fieldId: string
  label: string
  name: string
  defaultChecked?: boolean
  rules?: RegisterOptions
  errors?: FieldErrorMessage
}

export function CheckboxField({
  fieldId,
  label,
  name,
  defaultChecked,
  rules,
  errors,
}: CheckboxFieldProps) {
  const { register } = useFormContext()
  const registration = register(name, rules)

  return (
    <Field>
      <FieldLabel className="flex items-center gap-2" htmlFor={fieldId}>
        <Checkbox
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
