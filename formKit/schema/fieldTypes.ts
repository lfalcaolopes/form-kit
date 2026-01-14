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
