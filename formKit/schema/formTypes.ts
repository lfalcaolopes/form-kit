import type { HTMLInputTypeAttribute, ReactNode } from 'react'
import type { FieldValues, RegisterOptions } from 'react-hook-form'

import { FieldType } from './fieldTypes'

type FieldValueByType = {
  [FieldType.Input]: string
  [FieldType.SecretText]: string
  [FieldType.Textarea]: string
  [FieldType.Select]: string
  [FieldType.Checkbox]: string[]
  [FieldType.SingleCheckbox]: boolean
  [FieldType.Radio]: string
  [FieldType.Switch]: boolean
  [FieldType.Button]: never
}

type FieldCondition = (args: {
  values: FieldValues
}) => boolean

type FieldOptionsResolver = (args: { values: FieldValues }) => SelectOption[]

type BaseFieldConfig<TValue> = {
  name: string
  field: FieldType
  label: string
  titleBefore?: string
  titleBeforeClassName?: string
  descriptionBefore?: string
  descriptionBeforeClassName?: string
  helpText?: ReactNode
  icon?: ReactNode
  readOnly?: boolean
  disabled?: boolean
  defaultValue?: TValue
  rules?: RegisterOptions
  permission?: string
  hidden?: boolean
  shouldHide?: FieldCondition
  getIsRequired?: FieldCondition
}

type InputFieldConfig = BaseFieldConfig<string | number> & {
  field: typeof FieldType.Input
  type?: HTMLInputTypeAttribute
  placeholder?: string
  mask?: string
}

type SecretTextFieldConfig = BaseFieldConfig<string> & {
  field: typeof FieldType.SecretText
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
  options?: SelectOption[]
  getOptions?: FieldOptionsResolver
}

type CheckboxFieldConfig = BaseFieldConfig<string[]> & {
  field: typeof FieldType.Checkbox
  options?: SelectOption[]
  getOptions?: FieldOptionsResolver
}

type SwitchFieldConfig = BaseFieldConfig<boolean> & {
  field: typeof FieldType.Switch
}

type SingleCheckboxFieldConfig = BaseFieldConfig<boolean> & {
  field: typeof FieldType.SingleCheckbox
}

type RadioFieldConfig = BaseFieldConfig<string> & {
  field: typeof FieldType.Radio
  options?: SelectOption[]
  getOptions?: FieldOptionsResolver
}

type ButtonFieldConfig = BaseFieldConfig<never> & {
  field: typeof FieldType.Button
}

export type FormFieldConfig =
  | InputFieldConfig
  | SecretTextFieldConfig
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
