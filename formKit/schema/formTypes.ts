import type { HTMLInputTypeAttribute } from 'react'
import type { RegisterOptions } from 'react-hook-form'

import { FieldType } from './fieldTypes'

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

type CheckboxFieldConfig = BaseFieldConfig<boolean> & {
  field: typeof FieldType.Checkbox
}

type SwitchFieldConfig = BaseFieldConfig<boolean> & {
  field: typeof FieldType.Switch
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
  | SwitchFieldConfig
  | RadioFieldConfig
  | ButtonFieldConfig

export type FormSchema = Record<string, FormFieldConfig>
