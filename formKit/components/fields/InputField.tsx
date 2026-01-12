import type { ChangeEvent, HTMLInputTypeAttribute, ReactNode } from 'react'
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
import { cn } from '@/formKit/utils'
import { applyMask } from '@/formKit/utils/mask'

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
  inputBefore?: ReactNode
  inputAfter?: ReactNode
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
  inputBefore,
  inputAfter,
  rules,
  errors,
}: InputFieldProps) {
  const { register, control } = useFormContext()
  const registration = register(name, rules)
  const value = useWatch({ control, name })
  const displayValue = value ?? ''
  const { onChange, ...fieldRegistration } = registration

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!mask) {
      onChange(event)
      return
    }

    const inputValue = event.target.value ?? ''
    const maskedValue = applyMask(inputValue, mask)
    if (maskedValue !== inputValue) {
      event.target.value = maskedValue
    }
    onChange(event)
  }

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

  const hasInlineAddons = Boolean(inputBefore) || Boolean(inputAfter)

  return (
    <Field data-disabled={disabled}>
      <FieldLabel htmlFor={fieldId}>
        {icon}
        {label}
      </FieldLabel>
      <FieldContent>
        {hasInlineAddons ? (
          <div
            className={cn(
              'flex items-stretch rounded-md border border-slate-300 bg-white text-sm text-slate-900',
              'focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-200',
              disabled && 'opacity-50',
            )}
          >
            {inputBefore && (
              <div className="flex items-center border-r border-slate-200 px-3 text-sm text-slate-500">
                {inputBefore}
              </div>
            )}
            <Input
              id={fieldId}
              type={type}
              placeholder={placeholder}
              data-mask={mask}
              disabled={disabled}
              aria-invalid={!!errors?.length}
              className="h-full flex-1 border-0 bg-transparent px-3 py-2 text-sm text-slate-900 focus:border-transparent focus:ring-0"
              {...fieldRegistration}
              onChange={handleChange}
            />
            {inputAfter && (
              <div className="flex items-center border-l border-slate-200 px-3 text-sm text-slate-500">
                {inputAfter}
              </div>
            )}
          </div>
        ) : (
          <Input
            id={fieldId}
            type={type}
            placeholder={placeholder}
            data-mask={mask}
            disabled={disabled}
            aria-invalid={!!errors?.length}
            {...fieldRegistration}
            onChange={handleChange}
          />
        )}
        {helpText && <FieldDescription>{helpText}</FieldDescription>}
        <FieldError errors={errors} />
      </FieldContent>
    </Field>
  )
}
