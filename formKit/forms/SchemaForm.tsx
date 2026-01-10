import { useId, useMemo, type ReactNode } from 'react'
import {
  FormProvider,
  useForm,
  type DefaultValues,
  type FieldError as RHFFieldError,
  type FieldErrors,
  type FieldValues,
  type Path,
} from 'react-hook-form'

import {
  FieldType,
  fieldTypeComponentMap,
  type FormFieldConfig,
  type FormSchema,
} from '@/formKit/schema'
import { FieldGroup } from '@/formKit/components/fields/Field'
import { FormHeader } from '@/formKit/components/blocks/formHeader'

type FieldValue<TField extends FormFieldConfig> =
  TField extends { field: typeof FieldType.Input }
    ? string | number
    : TField extends { field: typeof FieldType.Textarea }
      ? string
      : TField extends { field: typeof FieldType.Select }
        ? string
        : TField extends { field: typeof FieldType.Checkbox }
          ? string[]
          : TField extends { field: typeof FieldType.SingleCheckbox }
            ? boolean
            : TField extends { field: typeof FieldType.Switch }
              ? boolean
              : TField extends { field: typeof FieldType.Radio }
                ? string
                : never

type FormValues<TSchema extends FormSchema> = FieldValues & {
  [K in keyof TSchema]: FieldValue<TSchema[K]>
}

type SchemaFormProps<TSchema extends FormSchema> = {
  schema: TSchema
  onSubmit: (values: FormValues<TSchema>) => void
  className?: string
  formId?: string
  title?: string
  formInfo?: ReactNode
}

function getFieldErrors<TSchema extends FormSchema>(
  errors: FieldErrors<FormValues<TSchema>>,
  fieldName: Path<FormValues<TSchema>>,
) {
  const error = errors[fieldName]
  if (!error) {
    return undefined
  }
  if ('message' in error) {
    return [error as RHFFieldError]
  }
  return undefined
}

export function SchemaForm<TSchema extends FormSchema>({
  schema,
  onSubmit,
  className,
  formId,
  title,
  formInfo,
}: SchemaFormProps<TSchema>) {
  const fallbackId = useId()
  const baseId = formId ?? fallbackId

  const defaultValues = useMemo(() => {
    const values = {} as DefaultValues<FormValues<TSchema>>
    Object.values(schema).forEach((field) => {
      if (field.defaultValue !== undefined) {
        values[field.name as Path<FormValues<TSchema>>] =
          field.defaultValue as FormValues<TSchema>[keyof FormValues<TSchema>]
      }
    })
    return values
  }, [schema])

  const form = useForm<FormValues<TSchema>>({
    defaultValues,
  })
  const {
    handleSubmit,
    formState: { errors },
  } = form

  const fields = Object.values(schema)

  return (
    <FormProvider {...form}>
      <form
        className={className}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <FormHeader title={title} info={formInfo} />
        <FieldGroup>
          {fields.map((field) => {
            const fieldName = field.name as Path<FormValues<TSchema>>
            const fieldId = `${baseId}-${field.name}`
            const fieldErrors = getFieldErrors(errors, fieldName)

            if (field.field === FieldType.Input) {
              const Input = fieldTypeComponentMap[FieldType.Input]
              return (
                <Input
                  key={fieldId}
                  fieldId={fieldId}
                  name={fieldName}
                  label={field.label}
                  type={field.type}
                  placeholder={field.placeholder}
                  mask={field.mask}
                  rules={field.rules}
                  errors={fieldErrors}
                />
              )
            }

            if (field.field === FieldType.Textarea) {
              const Textarea = fieldTypeComponentMap[FieldType.Textarea]
              return (
                <Textarea
                  key={fieldId}
                  fieldId={fieldId}
                  name={fieldName}
                  label={field.label}
                  placeholder={field.placeholder}
                  rules={field.rules}
                  errors={fieldErrors}
                />
              )
            }

            if (field.field === FieldType.Select) {
              const Select = fieldTypeComponentMap[FieldType.Select]
              return (
                <Select
                  key={fieldId}
                  fieldId={fieldId}
                  name={fieldName}
                  label={field.label}
                  options={field.options}
                  defaultValue={field.defaultValue}
                  rules={field.rules}
                  errors={fieldErrors}
                />
              )
            }

            if (field.field === FieldType.Checkbox) {
              const Checkbox = fieldTypeComponentMap[FieldType.Checkbox]
              return (
                <Checkbox
                  key={fieldId}
                  fieldId={fieldId}
                  name={fieldName}
                  label={field.label}
                  options={field.options}
                  defaultValue={field.defaultValue}
                  rules={field.rules}
                  errors={fieldErrors}
                />
              )
            }

            if (field.field === FieldType.SingleCheckbox) {
              const SingleCheckbox =
                fieldTypeComponentMap[FieldType.SingleCheckbox]
              return (
                <SingleCheckbox
                  key={fieldId}
                  fieldId={fieldId}
                  name={fieldName}
                  label={field.label}
                  defaultChecked={field.defaultValue}
                  rules={field.rules}
                  errors={fieldErrors}
                />
              )
            }

            if (field.field === FieldType.Switch) {
              const Switch = fieldTypeComponentMap[FieldType.Switch]
              return (
                <Switch
                  key={fieldId}
                  fieldId={fieldId}
                  name={fieldName}
                  label={field.label}
                  defaultChecked={field.defaultValue}
                  rules={field.rules}
                  errors={fieldErrors}
                />
              )
            }

            if (field.field === FieldType.Radio) {
              const Radio = fieldTypeComponentMap[FieldType.Radio]
              return (
                <Radio
                  key={fieldId}
                  fieldId={fieldId}
                  name={fieldName}
                  label={field.label}
                  options={field.options}
                  defaultValue={field.defaultValue}
                  rules={field.rules}
                  errors={fieldErrors}
                />
              )
            }

            if (field.field === FieldType.Button) {
              const Button = fieldTypeComponentMap[FieldType.Button]
              return (
                <Button key={fieldId} name={field.name} label={field.label} />
              )
            }

            return null
          })}
        </FieldGroup>
      </form>
    </FormProvider>
  )
}
