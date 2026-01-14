import type { ComponentType, HTMLInputTypeAttribute, ReactNode } from 'react'
import type {
  FieldValues,
  RegisterOptions,
  UseFormReturn,
} from 'react-hook-form'

import { FieldType } from './fieldTypes'

type FieldValueByType = {
  [FieldType.INPUT]: string
  [FieldType.SECRET_TEXT]: string
  [FieldType.TEXTAREA]: string
  [FieldType.SELECT]: string
  [FieldType.CHECKBOX]: string[]
  [FieldType.SINGLE_CHECKBOX]: boolean
  [FieldType.RADIO]: string
  [FieldType.SWITCH]: boolean
  [FieldType.BUTTON]: never
  [FieldType.CUSTOM]: unknown
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
  field: typeof FieldType.INPUT
  type?: HTMLInputTypeAttribute
  placeholder?: string
  mask?: string
  inputBefore?: ReactNode
  inputAfter?: ReactNode
}

type SecretTextFieldConfig = BaseFieldConfig<string> & {
  field: typeof FieldType.SECRET_TEXT
  placeholder?: string
  mask?: string
  inputBefore?: ReactNode
  inputAfter?: ReactNode
}

type TextareaFieldConfig = BaseFieldConfig<string> & {
  field: typeof FieldType.TEXTAREA
  placeholder?: string
}

type SelectOption = {
  label: string
  value: string
}

type SelectFieldConfig = BaseFieldConfig<string> & {
  field: typeof FieldType.SELECT
  options?: SelectOption[]
  getOptions?: FieldOptionsResolver
  enumOptions?: EnumOptions
}

type CheckboxFieldConfig = BaseFieldConfig<string[]> & {
  field: typeof FieldType.CHECKBOX
  options?: SelectOption[]
  getOptions?: FieldOptionsResolver
  enumOptions?: EnumOptions
}

type SwitchFieldConfig = BaseFieldConfig<boolean> & {
  field: typeof FieldType.SWITCH
}

type SingleCheckboxFieldConfig = BaseFieldConfig<boolean> & {
  field: typeof FieldType.SINGLE_CHECKBOX
}

type RadioFieldConfig = BaseFieldConfig<string> & {
  field: typeof FieldType.RADIO
  options?: SelectOption[]
  getOptions?: FieldOptionsResolver
  enumOptions?: EnumOptions
}

type ButtonFieldConfig = BaseFieldConfig<never> & {
  field: typeof FieldType.BUTTON
}

type CustomFieldConfig = BaseFieldConfig<unknown> & {
  field: typeof FieldType.CUSTOM
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
  FREE: 'free',
  ROW: 'row',
  COLUMN: 'column',
} as const

export type LayoutStrategy =
  typeof LayoutStrategy[keyof typeof LayoutStrategy]

export type FormValuesFromSchema<TSchema extends FormSchema> = {
  [K in keyof TSchema]: FieldValueFromConfig<TSchema[K]>
}

export const defineFormSchema = <TSchema extends FormSchema>(
  schema: TSchema,
) => schema
