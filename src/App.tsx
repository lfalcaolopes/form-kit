import { SchemaForm } from '../formKit/forms'
import {
  FieldType,
  type FormSchema,
  type FormValuesFromSchema,
} from '../formKit/schema'

const demoSchema: FormSchema = {
  fullName: {
    name: 'fullName',
    label: 'Full name',
    field: FieldType.Input,
    placeholder: 'Ada Lovelace',
    rules: { required: 'Full name is required' },
  },
  email: {
    name: 'email',
    label: 'Email address',
    field: FieldType.Input,
    type: 'email',
    placeholder: 'ada@example.com',
    rules: {
      required: 'Email is required',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Enter a valid email address',
      },
    },
  },
  role: {
    name: 'role',
    label: 'Role',
    field: FieldType.Select,
    defaultValue: 'designer',
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
  },
}

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

function App() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6">
        <div className="w-full my-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
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
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
