import type { ComponentProps, ComponentType } from 'react'

import type { FieldType } from '../schema'
import {
  ButtonField,
  CheckboxGroupField,
  CustomField,
  InputField,
  RadioField,
  SelectField,
  SingleCheckboxField,
  SwitchField,
  TextareaField,
} from '../components/fields'

type FieldComponentProps = {
  input: ComponentProps<typeof InputField>
  secretText: ComponentProps<typeof InputField>
  textarea: ComponentProps<typeof TextareaField>
  select: ComponentProps<typeof SelectField>
  checkbox: ComponentProps<typeof CheckboxGroupField>
  singleCheckbox: ComponentProps<typeof SingleCheckboxField>
  radio: ComponentProps<typeof RadioField>
  switch: ComponentProps<typeof SwitchField>
  button: ComponentProps<typeof ButtonField>
  custom: ComponentProps<typeof CustomField>
}

export const fieldRegistry: {
  [K in FieldType]: ComponentType<FieldComponentProps[K]>
} = {
  input: InputField,
  secretText: InputField,
  textarea: TextareaField,
  select: SelectField,
  checkbox: CheckboxGroupField,
  singleCheckbox: SingleCheckboxField,
  radio: RadioField,
  switch: SwitchField,
  button: ButtonField,
  custom: CustomField,
}
