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

export type FieldValue<TField extends FormFieldConfig> =
  TField extends { field: typeof FieldType.Input }
    ? string | number
    : TField extends { field: typeof FieldType.Textarea }
      ? string
      : TField extends { field: typeof FieldType.Select }
        ? string
        : TField extends { field: typeof FieldType.Checkbox }
          ? string[]
          : TField extends { field: typeof FieldType.SingleCheckbox }
            ? boolean
            : TField extends { field: typeof FieldType.Switch }
              ? boolean
              : TField extends { field: typeof FieldType.Radio }
                ? string
                : never

export type FormValues<TSchema extends FormSchema> = {
  [K in keyof TSchema]: FieldValue<TSchema[K]>
}
