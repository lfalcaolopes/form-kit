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
  Input: 'input',
  SecretText: 'secretText',
  Textarea: 'textarea',
  Select: 'select',
  Checkbox: 'checkbox',
  SingleCheckbox: 'singleCheckbox',
  Radio: 'radio',
  Switch: 'switch',
  Button: 'button',
  Custom: 'custom',
} as const

export type FieldType = typeof FieldType[keyof typeof FieldType]

type FieldComponentProps = {
  [FieldType.Input]: ComponentProps<typeof InputField>
  [FieldType.SecretText]: ComponentProps<typeof InputField>
  [FieldType.Textarea]: ComponentProps<typeof TextareaField>
  [FieldType.Select]: ComponentProps<typeof SelectField>
  [FieldType.Checkbox]: ComponentProps<typeof CheckboxGroupField>
  [FieldType.SingleCheckbox]: ComponentProps<typeof SingleCheckboxField>
  [FieldType.Radio]: ComponentProps<typeof RadioField>
  [FieldType.Switch]: ComponentProps<typeof SwitchField>
  [FieldType.Button]: ComponentProps<typeof ButtonField>
  [FieldType.Custom]: ComponentProps<typeof CustomField>
}

export const fieldTypeComponentMap: {
  [K in FieldType]: ComponentType<FieldComponentProps[K]>
} = {
  [FieldType.Input]: InputField,
  [FieldType.SecretText]: InputField,
  [FieldType.Textarea]: TextareaField,
  [FieldType.Select]: SelectField,
  [FieldType.Checkbox]: CheckboxGroupField,
  [FieldType.SingleCheckbox]: SingleCheckboxField,
  [FieldType.Radio]: RadioField,
  [FieldType.Switch]: SwitchField,
  [FieldType.Button]: ButtonField,
  [FieldType.Custom]: CustomField,
}
