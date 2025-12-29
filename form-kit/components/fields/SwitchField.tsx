import {
  useController,
  useFormContext,
  type RegisterOptions,
} from 'react-hook-form'

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
  const { control } = useFormContext()
  const { field } = useController({
    name,
    control,
    rules,
    defaultValue: defaultChecked ?? false,
  })

  return (
    <Field>
      <FieldLabel className="flex items-center gap-2" htmlFor={fieldId}>
        <Switch
          id={fieldId}
          name={field.name}
          checked={!!field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          ref={field.ref}
          aria-invalid={!!errors?.length}
        />
        {label}
      </FieldLabel>
      <FieldError errors={errors} />
    </Field>
  )
}
