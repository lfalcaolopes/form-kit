import type { HTMLInputTypeAttribute } from 'react'
import type { RegisterOptions } from 'react-hook-form'

import { FieldType } from './fieldTypes'

type FieldValueByType = {
  [FieldType.Input]: string
  [FieldType.Textarea]: string
  [FieldType.Select]: string
  [FieldType.Checkbox]: string[]
  [FieldType.SingleCheckbox]: boolean
  [FieldType.Radio]: string
  [FieldType.Switch]: boolean
  [FieldType.Button]: never
}

type BaseFieldConfig<TValue> = {
  name: string
  field: FieldType
  label: string
  defaultValue?: TValue
  rules?: RegisterOptions
}

type InputFieldConfig = BaseFieldConfig<string | number> & {
  field: typeof FieldType.Input
  type?: HTMLInputTypeAttribute
  placeholder?: string
  mask?: string
}

type TextareaFieldConfig = BaseFieldConfig<string> & {
  field: typeof FieldType.Textarea
  placeholder?: string
}

type SelectOption = {
  label: string
  value: string
}

type SelectFieldConfig = BaseFieldConfig<string> & {
  field: typeof FieldType.Select
  options: SelectOption[]
}

type CheckboxFieldConfig = BaseFieldConfig<string[]> & {
  field: typeof FieldType.Checkbox
  options: SelectOption[]
}

type SwitchFieldConfig = BaseFieldConfig<boolean> & {
  field: typeof FieldType.Switch
}

type SingleCheckboxFieldConfig = BaseFieldConfig<boolean> & {
  field: typeof FieldType.SingleCheckbox
}

type RadioFieldConfig = BaseFieldConfig<string> & {
  field: typeof FieldType.Radio
  options: SelectOption[]
}

type ButtonFieldConfig = BaseFieldConfig<never> & {
  field: typeof FieldType.Button
}

export type FormFieldConfig =
  | InputFieldConfig
  | TextareaFieldConfig
  | SelectFieldConfig
  | CheckboxFieldConfig
  | SingleCheckboxFieldConfig
  | SwitchFieldConfig
  | RadioFieldConfig
  | ButtonFieldConfig

export type FormSchema = Record<string, FormFieldConfig>

type FieldValueFromConfig<TField extends FormFieldConfig> =
  TField extends { field: infer TFieldType }
    ? TFieldType extends keyof FieldValueByType
      ? FieldValueByType[TFieldType]
      : never
    : never

export type FormValuesFromSchema<TSchema extends FormSchema> = {
  [K in keyof TSchema]: FieldValueFromConfig<TSchema[K]>
}

export const defineFormSchema = <TSchema extends FormSchema>(
  schema: TSchema,
) => schema
