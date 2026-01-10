import { useId, useMemo, type ReactNode } from 'react'
import {
  FormProvider,
  useForm,
  type UseFormReturn,
  type DefaultValues,
  type FieldError as RHFFieldError,
  type FieldErrors,
  type FieldValues,
  type Path,
} from 'react-hook-form'

import {
  FieldType,
  fieldTypeComponentMap,
  type FormSchema,
  type FormValuesFromSchema,
} from '@/formKit/schema'
import { FieldGroup } from '@/formKit/components/fields/Field'
import { FormHeader } from '@/formKit/components/blocks/formHeader'

type FormValues<TSchema extends FormSchema> = FieldValues &
  FormValuesFromSchema<TSchema>

type SchemaFormProps<TSchema extends FormSchema> = {
  schema: TSchema
  onSubmit: (values: FormValues<TSchema>) => void | Promise<void>
  transformBeforeFormSubmit?: (
    args: SchemaFormHookArgs<TSchema>,
  ) => FormValues<TSchema> | Promise<FormValues<TSchema>>
  onBeforeSave?: (
    args: SchemaFormHookArgs<TSchema>,
  ) => boolean | void | Promise<boolean | void>
  onAfterSave?: (args: SchemaFormHookArgs<TSchema>) => void | Promise<void>
  className?: string
  formId?: string
  title?: string
  formInfo?: ReactNode
  hasPermission?: (permission: string) => boolean
}

type SchemaFormHookArgs<TSchema extends FormSchema> = {
  values: FormValues<TSchema>
  methods: UseFormReturn<FormValues<TSchema>>
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
  transformBeforeFormSubmit,
  onBeforeSave,
  onAfterSave,
  className,
  formId,
  title,
  formInfo,
  hasPermission,
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
  const handleFormSubmit = async (values: FormValues<TSchema>) => {
    const transformedValues = transformBeforeFormSubmit
      ? await transformBeforeFormSubmit({ values, methods: form })
      : values

    if (onBeforeSave) {
      const shouldContinue = await onBeforeSave({
        values: transformedValues,
        methods: form,
      })
      if (shouldContinue === false) {
        return
      }
    }

    await onSubmit(transformedValues)

    if (onAfterSave) {
      await onAfterSave({ values: transformedValues, methods: form })
    }
  }

  return (
    <FormProvider {...form}>
      <form
        className={className}
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
      >
        <FormHeader title={title} info={formInfo} />
        <FieldGroup>
          {fields.map((field) => {
            if (field.permission && hasPermission) {
              const canRender = hasPermission(field.permission)
              if (!canRender) {
                return null
              }
            }

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
