import type { ReactNode } from 'react'
import {
  useController,
  useFormContext,
  useWatch,
  type RegisterOptions,
} from 'react-hook-form'

import { Radio } from '@/formKit/components/units/radio'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/formKit/components/fields/Field'
import { ReadOnlyField } from '@/formKit/components/fields/ReadOnlyField'
import type {
  FieldErrorMessage,
  FieldOption,
} from '@/formKit/components/fields/types'

export type RadioFieldProps = {
  fieldId: string
  label: string
  name: string
  helpText?: ReactNode
  icon?: ReactNode
  readOnly?: boolean
  disabled?: boolean
  options: FieldOption[]
  defaultValue?: string
  rules?: RegisterOptions
  errors?: FieldErrorMessage
}

export function RadioField({
  fieldId,
  label,
  name,
  helpText,
  icon,
  readOnly,
  disabled,
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
  const watchedValue = useWatch({ control, name })
  const selectedLabel =
    options.find((option) => option.value === watchedValue)?.label ?? ''

  if (readOnly) {
    return (
      <ReadOnlyField
        label={label}
        value={selectedLabel}
        helpText={helpText}
        icon={icon}
      />
    )
  }

  return (
    <FieldSet data-disabled={disabled}>
      <FieldLegend className={disabled ? 'opacity-50' : undefined}>
        <span className="inline-flex items-center gap-2">
          {icon}
          {label}
        </span>
      </FieldLegend>
      <FieldGroup data-slot="radio-group">
        {options.map((option) => {
          const optionId = `${fieldId}-${option.value}`

          return (
            <Field key={optionId} orientation="horizontal">
              <FieldLabel
                className="flex items-center gap-2"
                htmlFor={optionId}
              >
                <Radio
                  id={optionId}
                  name={field.name}
                  value={option.value}
                  checked={field.value === option.value}
                  disabled={disabled}
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
      {helpText && <FieldDescription>{helpText}</FieldDescription>}
      <FieldError errors={errors} />
    </FieldSet>
  )
}
