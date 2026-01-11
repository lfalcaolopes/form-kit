import { useId } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import {
  ButtonField,
  CheckboxGroupField,
  FieldGroup,
  InputField,
  RadioField,
  SelectField,
  SingleCheckboxField,
  SwitchField,
  TextareaField,
} from '../formKit/components/fields'
import { FormHeader } from '../formKit/components/blocks/formHeader'
import { Button } from '../formKit/components/units/button'
import { SchemaForm } from '../formKit/forms'
import {
  defineFormSchema,
  FieldType,
  type FormValuesFromSchema,
} from '../formKit/schema'

const demoSchema = defineFormSchema({
  requestId: {
    name: 'requestId',
    label: 'Request ID',
    field: FieldType.Input,
    defaultValue: 'REQ-2049',
    readOnly: true,
    helpText: 'Generated after you submit the form.',
  },
  fullName: {
    name: 'fullName',
    label: 'Full name',
    field: FieldType.Input,
    placeholder: 'Ada Lovelace',
    icon: (
      <svg
        aria-hidden="true"
        className="h-4 w-4 text-slate-500"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="8" cy="6" r="3" />
        <path d="M3 14c1.8-2 4-3 5-3s3.2 1 5 3" />
      </svg>
    ),
    helpText: 'Use your legal name for verification.',
    rules: { required: 'Full name is required' },
  },
  email: {
    name: 'email',
    label: 'Email address',
    field: FieldType.Input,
    type: 'email',
    placeholder: 'ada@example.com',
    helpText: 'We will only send delivery updates.',
    rules: {
      required: 'Email is required',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Enter a valid email address',
      },
    },
  },
  accessKey: {
    name: 'accessKey',
    label: 'Access key',
    field: FieldType.SecretText,
    placeholder: 'Enter a secure access key',
    rules: { required: 'Access key is required' },
  },
  role: {
    name: 'role',
    label: 'Role',
    field: FieldType.Select,
    defaultValue: 'designer',
    disabled: true,
    helpText: 'Role is assigned by your workspace admin.',
    options: [
      { label: 'Designer', value: 'designer' },
      { label: 'Engineer', value: 'engineer' },
      { label: 'Product', value: 'pm' },
    ],
  },
  summary: {
    name: 'summary',
    label: 'Project summary',
    field: FieldType.Textarea,
    placeholder: 'Tell us about your project goals.',
    rules: { minLength: { value: 10, message: 'Add a bit more detail.' } },
  },
  alerts: {
    name: 'alerts',
    label: 'Enable alerts',
    field: FieldType.Switch,
    defaultValue: true,
    helpText: 'Notify me when the request status changes.',
  },
  plan: {
    name: 'plan',
    label: 'Plan',
    field: FieldType.Radio,
    defaultValue: 'premium',
    options: [
      { label: 'Premium plan', value: 'premium' },
      { label: 'Standard plan', value: 'standard' },
    ],
  },
  availability: {
    name: 'availability',
    label: 'Availability',
    field: FieldType.Checkbox,
    permission: 'form:availability:edit',
    options: [
      { label: 'Manhã', value: 'morning' },
      { label: 'Tarde', value: 'afternoon' },
      { label: 'Noite', value: 'night' },
    ],
  },
  consent: {
    name: 'consent',
    label: 'I agree to receive updates',
    field: FieldType.SingleCheckbox,
    rules: { required: 'Please opt in to continue' },
  },
  submit: {
    name: 'submit',
    label: 'Submit application',
    field: FieldType.Button,
    permission: 'form:submit',
  },
})

type DemoValues = FormValuesFromSchema<typeof demoSchema>

const handleBeforeSave = ({ values }: { values: DemoValues }) => {
  console.log('Before save', values)
  return true
}

const handleSubmit = (values: DemoValues) => {
  console.log('Submitted', values)
}

const handleAfterSave = ({ values }: { values: DemoValues }) => {
  console.log('After save', values)
}

const transformBeforeFormSubmit = ({ values }: { values: DemoValues }) => {
  const nextValues = { ...values }
  if (typeof nextValues.fullName === 'string') {
    nextValues.fullName = nextValues.fullName.trim()
  }
  if (typeof nextValues.email === 'string') {
    nextValues.email = nextValues.email.trim().toLowerCase()
  }
  return nextValues
}

const userPermissions = new Set(['form:edit', 'form:submit'])
const hasPermission = (permission: string) => userPermissions.has(permission)

const roleOptions = [
  { label: 'Designer', value: 'designer' },
  { label: 'Engineer', value: 'engineer' },
  { label: 'Product', value: 'pm' },
]

const planOptions = [
  { label: 'Premium plan', value: 'premium' },
  { label: 'Standard plan', value: 'standard' },
]

const availabilityOptions = [
  { label: 'Morning', value: 'morning' },
  { label: 'Afternoon', value: 'afternoon' },
  { label: 'Night', value: 'night' },
]

type DemoFormMode = 'normal' | 'readOnly' | 'disabled'

type DemoFormProps = {
  title: string
  description: string
  mode: DemoFormMode
}

const baseValues = {
  fullName: 'Ada Lovelace',
  email: 'ada@example.com',
  accessKey: 'project-aurora',
  summary: 'Exploring a lightweight schema-driven setup.',
  role: 'designer',
  plan: 'premium',
  availability: ['morning', 'night'],
  alerts: true,
  consent: true,
}

function DemoForm({ title, description, mode }: DemoFormProps) {
  const formId = useId()
  const form = useForm({ defaultValues: baseValues })
  const isReadOnly = mode === 'readOnly'
  const isDisabled = mode === 'disabled'

  return (
    <FormProvider {...form}>
      <form
        className="space-y-6"
        onSubmit={(event) => event.preventDefault()}
      >
        <FormHeader title={title} info={description} />
        <FieldGroup>
          <InputField
            fieldId={`${formId}-fullName`}
            name="fullName"
            label="Full name"
            placeholder="Ada Lovelace"
            readOnly={isReadOnly}
            disabled={isDisabled}
          />
          <InputField
            fieldId={`${formId}-email`}
            name="email"
            type="email"
            label="Email address"
            placeholder="ada@example.com"
            readOnly={isReadOnly}
            disabled={isDisabled}
          />
          <InputField
            fieldId={`${formId}-accessKey`}
            name="accessKey"
            type="password"
            label="Access key"
            placeholder="Enter a secure access key"
            readOnly={isReadOnly}
            disabled={isDisabled}
          />
          <TextareaField
            fieldId={`${formId}-summary`}
            name="summary"
            label="Project summary"
            placeholder="Tell us about your project goals."
            readOnly={isReadOnly}
            disabled={isDisabled}
          />
          <SelectField
            fieldId={`${formId}-role`}
            name="role"
            label="Role"
            options={roleOptions}
            defaultValue="designer"
            readOnly={isReadOnly}
            disabled={isDisabled}
          />
          <RadioField
            fieldId={`${formId}-plan`}
            name="plan"
            label="Plan"
            options={planOptions}
            defaultValue="premium"
            readOnly={isReadOnly}
            disabled={isDisabled}
          />
          <CheckboxGroupField
            fieldId={`${formId}-availability`}
            name="availability"
            label="Availability"
            options={availabilityOptions}
            defaultValue={['morning', 'night']}
            readOnly={isReadOnly}
            disabled={isDisabled}
          />
          <SwitchField
            fieldId={`${formId}-alerts`}
            name="alerts"
            label="Enable alerts"
            defaultChecked
            readOnly={isReadOnly}
            disabled={isDisabled}
          />
          <SingleCheckboxField
            fieldId={`${formId}-consent`}
            name="consent"
            label="I agree to receive updates"
            defaultChecked
            readOnly={isReadOnly}
            disabled={isDisabled}
          />
          {isDisabled ? (
            <Button name="submit" type="submit" disabled>
              Submit application
            </Button>
          ) : (
            <ButtonField name="submit" label="Submit application" />
          )}
        </FieldGroup>
      </form>
    </FormProvider>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6">
        <div className="w-full my-10 flex flex-col gap-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="mt-2 text-3xl font-semibold text-slate-900">
                  Form Kit Playground
                </h1>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                v1
              </span>
            </div>
            <div className="mt-6">
              <SchemaForm
                schema={demoSchema}
                className="space-y-6"
                title="Request intake form"
                formInfo="Share the essentials so we can route your request quickly."
                onBeforeSave={handleBeforeSave}
                transformBeforeFormSubmit={transformBeforeFormSubmit}
                onSubmit={handleSubmit}
                onAfterSave={handleAfterSave}
                hasPermission={hasPermission}
              />
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
            <DemoForm
              title="Read-only controls"
              description="Same components rendered in read-only mode."
              mode="readOnly"
            />
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
            <DemoForm
              title="Disabled controls"
              description="Every input disabled for visual comparison."
              mode="disabled"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
