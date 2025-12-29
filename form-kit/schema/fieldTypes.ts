import type { ComponentProps, ComponentType } from 'react'

import { ButtonField } from '../components/fields/ButtonField'
import { CheckboxField } from '../components/fields/CheckboxField'
import { InputField } from '../components/fields/InputField'
import { RadioField } from '../components/fields/RadioField'
import { SelectField } from '../components/fields/SelectField'
import { SwitchField } from '../components/fields/SwitchField'
import { TextareaField } from '../components/fields/TextareaField'

export const FieldType = {
  Input: 'input',
  Textarea: 'textarea',
  Select: 'select',
  Checkbox: 'checkbox',
  Radio: 'radio',
  Switch: 'switch',
  Button: 'button',
} as const

export type FieldType = typeof FieldType[keyof typeof FieldType]

type FieldComponentProps = {
  [FieldType.Input]: ComponentProps<typeof InputField>
  [FieldType.Textarea]: ComponentProps<typeof TextareaField>
  [FieldType.Select]: ComponentProps<typeof SelectField>
  [FieldType.Checkbox]: ComponentProps<typeof CheckboxField>
  [FieldType.Radio]: ComponentProps<typeof RadioField>
  [FieldType.Switch]: ComponentProps<typeof SwitchField>
  [FieldType.Button]: ComponentProps<typeof ButtonField>
}

export const fieldTypeComponentMap: {
  [K in FieldType]: ComponentType<FieldComponentProps[K]>
} = {
  [FieldType.Input]: InputField,
  [FieldType.Textarea]: TextareaField,
  [FieldType.Select]: SelectField,
  [FieldType.Checkbox]: CheckboxField,
  [FieldType.Radio]: RadioField,
  [FieldType.Switch]: SwitchField,
  [FieldType.Button]: ButtonField,
}
