import type { ComponentProps, ComponentType } from 'react'

import { ButtonField } from '../components/fields/ButtonField'
import { CheckboxGroupField } from '../components/fields/CheckboxGroupField'
import { CustomField } from '../components/fields/CustomField'
import { InputField } from '../components/fields/InputField'
import { RadioField } from '../components/fields/RadioField'
import { SelectField } from '../components/fields/SelectField'
import { SingleCheckboxField } from '../components/fields/SingleCheckboxField'
import { SwitchField } from '../components/fields/SwitchField'
import { TextareaField } from '../components/fields/TextareaField'

export const FieldType = {
  INPUT: 'input',
  SECRET_TEXT: 'secretText',
  TEXTAREA: 'textarea',
  SELECT: 'select',
  CHECKBOX: 'checkbox',
  SINGLE_CHECKBOX: 'singleCheckbox',
  RADIO: 'radio',
  SWITCH: 'switch',
  BUTTON: 'button',
  CUSTOM: 'custom',
} as const

export type FieldType = typeof FieldType[keyof typeof FieldType]

type FieldComponentProps = {
  [FieldType.INPUT]: ComponentProps<typeof InputField>
  [FieldType.SECRET_TEXT]: ComponentProps<typeof InputField>
  [FieldType.TEXTAREA]: ComponentProps<typeof TextareaField>
  [FieldType.SELECT]: ComponentProps<typeof SelectField>
  [FieldType.CHECKBOX]: ComponentProps<typeof CheckboxGroupField>
  [FieldType.SINGLE_CHECKBOX]: ComponentProps<typeof SingleCheckboxField>
  [FieldType.RADIO]: ComponentProps<typeof RadioField>
  [FieldType.SWITCH]: ComponentProps<typeof SwitchField>
  [FieldType.BUTTON]: ComponentProps<typeof ButtonField>
  [FieldType.CUSTOM]: ComponentProps<typeof CustomField>
}

export const fieldTypeComponentMap: {
  [K in FieldType]: ComponentType<FieldComponentProps[K]>
} = {
  [FieldType.INPUT]: InputField,
  [FieldType.SECRET_TEXT]: InputField,
  [FieldType.TEXTAREA]: TextareaField,
  [FieldType.SELECT]: SelectField,
  [FieldType.CHECKBOX]: CheckboxGroupField,
  [FieldType.SINGLE_CHECKBOX]: SingleCheckboxField,
  [FieldType.RADIO]: RadioField,
  [FieldType.SWITCH]: SwitchField,
  [FieldType.BUTTON]: ButtonField,
  [FieldType.CUSTOM]: CustomField,
}
