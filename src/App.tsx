import { useId, useState } from 'react'
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
  type CustomFieldComponentProps,
  defineFormSchema,
  FieldType,
  type FormValuesFromSchema,
} from '../formKit/schema'
import { cn } from '../formKit/utils'

const UrgencyLevel = {
  LOW: 'low',
  NORMAL: 'normal',
  HIGH: 'high',
} as const

const priorityToneOptions = [
  {
    label: 'Balanced',
    value: 'balanced',
    description: 'Steady updates with a measured response.',
  },
  {
    label: 'Expedite',
    value: 'expedite',
    description: 'Flag this request for quick turnaround.',
  },
  {
    label: 'Critical',
    value: 'critical',
    description: 'Escalate with maximum urgency.',
  },
]

type PriorityToneFieldProps = CustomFieldComponentProps & {
  options?: Array<{
    label: string
    value: string
    description: string
  }>
}

const PriorityToneField = ({
  name,
  form,
  options = [],
  disabled,
  readOnly,
  rules,
}: PriorityToneFieldProps) => {
  const currentValue = form.watch(name)

  return (
    <div className="grid gap-2">
      {options.map((option) => {
        const isActive = currentValue === option.value

        return (
          <button
            key={option.value}
            type="button"
            className={cn(
              'flex w-full items-start justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition',
              isActive
                ? 'border-slate-900 bg-slate-900 text-white'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50',
              (disabled || readOnly) && 'cursor-not-allowed opacity-60',
            )}
            onClick={() => {
              if (disabled || readOnly) {
                return
              }
              form.setValue(name, option.value, {
                shouldDirty: true,
                shouldValidate: true,
              })
            }}
            disabled={disabled || readOnly}
          >
            <span className="flex flex-col gap-1">
              <span className="text-sm font-semibold">{option.label}</span>
              <span className="text-xs text-slate-500">
                {option.description}
              </span>
            </span>
            {isActive && (
              <span className="text-xs font-semibold uppercase tracking-wide">
                Active
              </span>
            )}
          </button>
        )
      })}
      <input type="hidden" {...form.register(name, rules)} />
    </div>
  )
}

const demoSchema = defineFormSchema({
  requestId: {
    name: 'requestId',
    label: 'Request ID',
    field: FieldType.INPUT,
    defaultValue: 'REQ-2049',
    readOnly: true,
    helpText: 'Generated after you submit the form.',
  },
  internalTag: {
    name: 'internalTag',
    label: 'Internal tag',
    field: FieldType.INPUT,
    defaultValue: 'INT-448',
    hidden: true,
  },
  fullName: {
    name: 'fullName',
    label: 'Full name',
    field: FieldType.INPUT,
    titleBefore: 'Contact details',
    descriptionBefore: 'Tell us who to reach about this request.',
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
    field: FieldType.INPUT,
    type: 'email',
    placeholder: 'ada@example.com',
    componentBefore: (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
        Use a shared inbox if multiple people should receive updates.
      </div>
    ),
    helpText: 'We will only send delivery updates.',
    rules: {
      required: 'Email is required',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Enter a valid email address',
      },
    },
    componentAfter: (
      <div className="text-xs text-slate-500">
        We recommend addresses that can accept external mail.
      </div>
    ),
  },
  website: {
    name: 'website',
    label: 'Company site',
    field: FieldType.INPUT,
    placeholder: 'studio',
    inputBefore: <span className="text-xs text-slate-500">https://</span>,
    inputAfter: <span className="text-xs text-slate-500">.com</span>,
    helpText: 'Leave blank if you do not have a public site.',
  },
  phone: {
    name: 'phone',
    label: 'Phone',
    field: FieldType.INPUT,
    type: 'tel',
    placeholder: '(55) 12345-6789',
    mask: '(99) 99999-9999',
    helpText: 'Digits only; formatting is applied automatically.',
  },
  accessKey: {
    name: 'accessKey',
    label: 'Access key',
    field: FieldType.SECRET_TEXT,
    placeholder: 'Enter a secure access key',
    rules: { required: 'Access key is required' },
  },
  role: {
    name: 'role',
    label: 'Role',
    field: FieldType.SELECT,
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
    field: FieldType.TEXTAREA,
    placeholder: 'Tell us about your project goals.',
    rules: { minLength: { value: 10, message: 'Add a bit more detail.' } },
  },
  urgency: {
    name: 'urgency',
    label: 'Urgency',
    field: FieldType.SELECT,
    defaultValue: UrgencyLevel.NORMAL,
    enumOptions: UrgencyLevel,
    helpText: 'Enum-backed options keep labels consistent.',
  },
  priorityTone: {
    name: 'priorityTone',
    label: 'Priority tone',
    field: FieldType.CUSTOM,
    defaultValue: 'balanced',
    component: PriorityToneField,
    componentProps: {
      options: priorityToneOptions,
    },
    helpText: 'Highlight the response expectation for this request.',
  },
  alerts: {
    name: 'alerts',
    label: 'Enable alerts',
    field: FieldType.SWITCH,
    defaultValue: true,
    helpText: 'Notify me when the request status changes.',
  },
  followUp: {
    name: 'followUp',
    label: 'Needs follow-up',
    field: FieldType.SWITCH,
    defaultValue: false,
    helpText: 'Reveal notes when follow-up is enabled.',
  },
  followUpNotes: {
    name: 'followUpNotes',
    label: 'Follow-up notes',
    field: FieldType.TEXTAREA,
    placeholder: 'Add context for the team.',
    shouldHide: ({ values }) => !values.followUp,
    getIsRequired: ({values }) => values.followUp,
    rules: { required: 'Follow up notes is required when follor up is enabled' },
  },
  plan: {
    name: 'plan',
    label: 'Plan',
    field: FieldType.RADIO,
    defaultValue: 'premium',
    options: [
      { label: 'Premium plan', value: 'premium' },
      { label: 'Standard plan', value: 'standard' },
    ],
  },
  supportTier: {
    name: 'supportTier',
    label: 'Support tier',
    field: FieldType.SELECT,
    defaultValue: 'priority',
    getOptions: ({ values }) =>
      values.plan === 'premium'
        ? [
            { label: 'Priority support', value: 'priority' },
            { label: 'Dedicated CSM', value: 'csm' },
          ]
        : [
            { label: 'Standard support', value: 'standard' },
            { label: 'Community only', value: 'community' },
          ],
    helpText: 'Options adjust to the selected plan.',
  },
  availability: {
    name: 'availability',
    label: 'Availability',
    field: FieldType.CHECKBOX,
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
    field: FieldType.SINGLE_CHECKBOX,
    rules: { required: 'Please opt in to continue' },
  },
  submit: {
    name: 'submit',
    label: 'Submit application',
    field: FieldType.BUTTON,
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

const layoutSchema = defineFormSchema({
  firstName: {
    name: 'firstName',
    label: 'First name',
    field: FieldType.INPUT,
    row: 1,
    placeholder: 'Ada',
    rules: { required: 'First name is required' },
  },
  lastName: {
    name: 'lastName',
    label: 'Last name',
    field: FieldType.INPUT,
    row: 1,
    placeholder: 'Lovelace',
    rules: { required: 'Last name is required' },
  },
  email: {
    name: 'email',
    label: 'Work email',
    field: FieldType.INPUT,
    row: 2,
    type: 'email',
    placeholder: 'ada@lovelace.studio',
  },
  role: {
    name: 'role',
    label: 'Role',
    field: FieldType.SELECT,
    row: 2,
    defaultValue: 'designer',
    options: roleOptions,
  },
  notes: {
    name: 'notes',
    label: 'Notes',
    field: FieldType.TEXTAREA,
    row: 3,
    placeholder: 'Anything the team should know?',
  },
  submit: {
    name: 'submit',
    label: 'Save layout example',
    field: FieldType.BUTTON,
    row: 4,
  },
})

type LayoutValues = FormValuesFromSchema<typeof layoutSchema>

const handleLayoutSubmit = (values: LayoutValues) => {
  console.log('Layout submitted', values)
}

const columnLayoutSchema = defineFormSchema({
  summary: {
    name: 'summary',
    label: 'Summary',
    field: FieldType.TEXTAREA,
    column: 0,
    placeholder: 'High-level overview for the team.',
  },
  priority: {
    name: 'priority',
    label: 'Priority',
    field: FieldType.RADIO,
    column: 0,
    defaultValue: 'normal',
    options: [
      { label: 'Low', value: 'low' },
      { label: 'Normal', value: 'normal' },
      { label: 'Urgent', value: 'urgent' },
    ],
  },
  owner: {
    name: 'owner',
    label: 'Owner',
    field: FieldType.INPUT,
    column: 1,
    placeholder: 'Assigned teammate',
  },
  status: {
    name: 'status',
    label: 'Status',
    field: FieldType.SELECT,
    column: 1,
    defaultValue: 'open',
    options: [
      { label: 'Open', value: 'open' },
      { label: 'In progress', value: 'in-progress' },
      { label: 'Blocked', value: 'blocked' },
    ],
  },
  submit: {
    name: 'submit',
    label: 'Save column example',
    field: FieldType.BUTTON,
    column: 1,
  },
})

type ColumnLayoutValues = FormValuesFromSchema<typeof columnLayoutSchema>

const handleColumnLayoutSubmit = (values: ColumnLayoutValues) => {
  console.log('Column layout submitted', values)
}

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
  supportTier: 'priority',
  availability: ['morning', 'night'],
  alerts: true,
  consent: true,
}

function DemoForm({ title, description, mode }: DemoFormProps) {
  const [isEdit, setIsEdit] = useState(false)
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
            readOnly={isReadOnly && !isEdit}
            disabled={isDisabled}
          />
          <InputField
            fieldId={`${formId}-email`}
            name="email"
            type="email"
            label="Email address"
            placeholder="ada@example.com"
            readOnly={isReadOnly && !isEdit}
            disabled={isDisabled}
          />
          <InputField
            fieldId={`${formId}-accessKey`}
            name="accessKey"
            type="password"
            label="Access key"
            placeholder="Enter a secure access key"
            readOnly={isReadOnly && !isEdit}
            disabled={isDisabled}
          />
          <TextareaField
            fieldId={`${formId}-summary`}
            name="summary"
            label="Project summary"
            placeholder="Tell us about your project goals."
            readOnly={isReadOnly && !isEdit}
            disabled={isDisabled}
          />
          <SelectField
            fieldId={`${formId}-role`}
            name="role"
            label="Role"
            options={roleOptions}
            defaultValue="designer"
            readOnly={isReadOnly && !isEdit}
            disabled={isDisabled}
          />
          <RadioField
            fieldId={`${formId}-plan`}
            name="plan"
            label="Plan"
            options={planOptions}
            defaultValue="premium"
            
            readOnly={isReadOnly && !isEdit}

            disabled={isDisabled}
          />
          <CheckboxGroupField
            fieldId={`${formId}-availability`}
            name="availability"
            label="Availability"
            options={availabilityOptions}
            defaultValue={['morning', 'night']}
            readOnly={isReadOnly && !isEdit}
            disabled={isDisabled}
          />
          <SwitchField
            fieldId={`${formId}-alerts`}
            name="alerts"
            label="Enable alerts"
            defaultChecked
            
            readOnly={isReadOnly && !isEdit}

            disabled={isDisabled}
          />
          <SingleCheckboxField
            fieldId={`${formId}-consent`}
            name="consent"
            label="I agree to receive updates"
            defaultChecked
            readOnly={isReadOnly && !isEdit}
            disabled={isDisabled}
          />
          {isDisabled ? (
            <Button name="submit" type="submit" disabled>
              Submit application
            </Button>
          ) : (
            <ButtonField name="submit" label="Submit application" />
          )}
          {isReadOnly && (
            <Button name='Edit' onClick={()=>{setIsEdit((prev)=>!prev)}}>Edit</Button>
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
            <SchemaForm
              schema={layoutSchema}
              className="space-y-6"
              title="Row layout example"
              formInfo="Fields share rows on larger screens and stack on small screens."
              onSubmit={handleLayoutSubmit}
            />
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
            <SchemaForm
              schema={columnLayoutSchema}
              className="space-y-6"
              title="Column layout example"
              formInfo="Fields group into columns on large screens and stack on mobile."
              onSubmit={handleColumnLayoutSubmit}
            />
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
