import type { ComponentType, HTMLInputTypeAttribute, ReactNode } from 'react'
import type {
  FieldValues,
  RegisterOptions,
  UseFormReturn,
} from 'react-hook-form'

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
  [FieldType.Custom]: unknown
}

type FieldCondition = (args: {
  values: FieldValues
}) => boolean

type FieldOptionsResolver = (args: { values: FieldValues }) => SelectOption[]
type EnumOptions = Record<string, string>

type BaseFieldConfig<TValue> = {
  name: string
  field: FieldType
  label: string
  row?: number
  column?: number
  titleBefore?: string
  titleBeforeClassName?: string
  descriptionBefore?: string
  descriptionBeforeClassName?: string
  componentBefore?: ReactNode
  componentAfter?: ReactNode
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

export type CustomFieldComponentProps = {
  fieldId: string
  name: string
  label: string
  helpText?: ReactNode
  icon?: ReactNode
  readOnly?: boolean
  disabled?: boolean
  rules?: RegisterOptions
  errors?: Array<{ message?: string } | undefined>
  form: UseFormReturn<FieldValues>
}

type InputFieldConfig = BaseFieldConfig<string | number> & {
  field: typeof FieldType.Input
  type?: HTMLInputTypeAttribute
  placeholder?: string
  mask?: string
  inputBefore?: ReactNode
  inputAfter?: ReactNode
}

type SecretTextFieldConfig = BaseFieldConfig<string> & {
  field: typeof FieldType.SecretText
  placeholder?: string
  mask?: string
  inputBefore?: ReactNode
  inputAfter?: ReactNode
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
  enumOptions?: EnumOptions
}

type CheckboxFieldConfig = BaseFieldConfig<string[]> & {
  field: typeof FieldType.Checkbox
  options?: SelectOption[]
  getOptions?: FieldOptionsResolver
  enumOptions?: EnumOptions
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
  enumOptions?: EnumOptions
}

type ButtonFieldConfig = BaseFieldConfig<never> & {
  field: typeof FieldType.Button
}

type CustomFieldConfig = BaseFieldConfig<unknown> & {
  field: typeof FieldType.Custom
  component: ComponentType<CustomFieldComponentProps & Record<string, unknown>>
  componentProps?: Record<string, unknown>
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
  | CustomFieldConfig

export type FormSchema = Record<string, FormFieldConfig>

type FieldValueFromConfig<TField extends FormFieldConfig> =
  TField extends { field: infer TFieldType }
    ? TFieldType extends keyof FieldValueByType
      ? FieldValueByType[TFieldType]
      : never
    : never

export const LayoutStrategy = {
  Free: 'free',
  Row: 'row',
  Column: 'column',
} as const

export type LayoutStrategy =
  typeof LayoutStrategy[keyof typeof LayoutStrategy]

export type FormValuesFromSchema<TSchema extends FormSchema> = {
  [K in keyof TSchema]: FieldValueFromConfig<TSchema[K]>
}

export const defineFormSchema = <TSchema extends FormSchema>(
  schema: TSchema,
) => schema
