import {
  useController,
  useFormContext,
  type RegisterOptions,
} from 'react-hook-form'

import { Radio } from '@/formKit/components/units/radio'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/formKit/components/fields/Field'
import type {
  FieldErrorMessage,
  FieldOption,
} from '@/formKit/components/fields/types'

export type RadioFieldProps = {
  fieldId: string
  label: string
  name: string
  options: FieldOption[]
  defaultValue?: string
  rules?: RegisterOptions
  errors?: FieldErrorMessage
}

export function RadioField({
  fieldId,
  label,
  name,
  options,
  defaultValue,
  rules,
  errors,
}: RadioFieldProps) {
  const { control } = useFormContext()
  const { field } = useController({
    name,
    control,
    rules,
    defaultValue,
  })

  return (
    <FieldSet>
      <FieldLegend>{label}</FieldLegend>
      <FieldGroup data-slot="radio-group">
        {options.map((option) => {
          const optionId = `${fieldId}-${option.value}`

          return (
            <Field key={optionId} orientation="horizontal">
              <FieldLabel className="flex items-center gap-2" htmlFor={optionId}>
                <Radio
                  id={optionId}
                  name={field.name}
                  value={option.value}
                  checked={field.value === option.value}
                  onChange={() => field.onChange(option.value)}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  aria-invalid={!!errors?.length}
                />
                {option.label}
              </FieldLabel>
            </Field>
          )
        })}
      </FieldGroup>
      <FieldError errors={errors} />
    </FieldSet>
  )
}
