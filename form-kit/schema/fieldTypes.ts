import type { ComponentProps, ComponentType } from 'react'

import { Button } from '../components/ui/button'
import { Checkbox } from '../components/ui/checkbox'
import { Input } from '../components/ui/input'
import { Radio } from '../components/ui/radio'
import { Select } from '../components/ui/select'
import { Switch } from '../components/ui/switch'
import { Textarea } from '../components/ui/textarea'

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
  [FieldType.Input]: ComponentProps<typeof Input>
  [FieldType.Textarea]: ComponentProps<typeof Textarea>
  [FieldType.Select]: ComponentProps<typeof Select>
  [FieldType.Checkbox]: ComponentProps<typeof Checkbox>
  [FieldType.Radio]: ComponentProps<typeof Radio>
  [FieldType.Switch]: ComponentProps<typeof Switch>
  [FieldType.Button]: ComponentProps<typeof Button>
}

export const fieldTypeComponentMap: {
  [K in FieldType]: ComponentType<FieldComponentProps[K]>
} = {
  [FieldType.Input]: Input,
  [FieldType.Textarea]: Textarea,
  [FieldType.Select]: Select,
  [FieldType.Checkbox]: Checkbox,
  [FieldType.Radio]: Radio,
  [FieldType.Switch]: Switch,
  [FieldType.Button]: Button,
}
