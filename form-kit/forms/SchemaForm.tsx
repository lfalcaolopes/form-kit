import { useId, useMemo } from 'react'
import {
  useForm,
  type DefaultValues,
  type FieldError as RHFFieldError,
  type FieldErrors,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from 'react-hook-form'

import {
  FieldType,
  fieldTypeComponentMap,
  type FormFieldConfig,
  type FormSchema,
} from '@/form-kit/schema'
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/form-kit/components/ui/field'

type FieldValue<TField extends FormFieldConfig> =
  TField extends { field: typeof FieldType.Input }
    ? string | number
    : TField extends { field: typeof FieldType.Textarea }
      ? string
      : TField extends { field: typeof FieldType.Select }
        ? string
        : TField extends { field: typeof FieldType.Checkbox }
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues<TSchema>>({
    defaultValues,
  })

  const fields = Object.values(schema)
  const toRegisterOptions = (
    rules?: RegisterOptions,
  ): RegisterOptions<FormValues<TSchema>, Path<FormValues<TSchema>>> | undefined =>
    rules as
      | RegisterOptions<FormValues<TSchema>, Path<FormValues<TSchema>>>
      | undefined

  return (
    <form
      className={className}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <FieldGroup>
        {fields.map((field) => {
          const fieldName = field.name as Path<FormValues<TSchema>>
          const fieldId = `${baseId}-${field.name}`
          const fieldErrors = getFieldErrors(errors, fieldName)
          const registerOptions = toRegisterOptions(field.rules)

          if (field.field === FieldType.Input) {
            const Input = fieldTypeComponentMap[FieldType.Input]
            return (
              <Field key={fieldId}>
                <FieldLabel htmlFor={fieldId}>{field.label}</FieldLabel>
                <FieldContent>
                  <Input
                    id={fieldId}
                    type={field.type}
                    placeholder={field.placeholder}
                    data-mask={field.mask}
                    aria-invalid={!!fieldErrors?.length}
                    {...register(fieldName, registerOptions)}
                  />
                  <FieldError errors={fieldErrors} />
                </FieldContent>
              </Field>
            )
          }

          if (field.field === FieldType.Textarea) {
            const Textarea = fieldTypeComponentMap[FieldType.Textarea]
            return (
              <Field key={fieldId}>
                <FieldLabel htmlFor={fieldId}>{field.label}</FieldLabel>
                <FieldContent>
                  <Textarea
                    id={fieldId}
                    placeholder={field.placeholder}
                    aria-invalid={!!fieldErrors?.length}
                    {...register(fieldName, registerOptions)}
                  />
                  <FieldError errors={fieldErrors} />
                </FieldContent>
              </Field>
            )
          }

          if (field.field === FieldType.Select) {
            const Select = fieldTypeComponentMap[FieldType.Select]
            return (
              <Field key={fieldId}>
                <FieldLabel htmlFor={fieldId}>{field.label}</FieldLabel>
                <FieldContent>
                  <Select
                    id={fieldId}
                    defaultValue={field.defaultValue}
                    aria-invalid={!!fieldErrors?.length}
                    {...register(fieldName, registerOptions)}
                  >
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                  <FieldError errors={fieldErrors} />
                </FieldContent>
              </Field>
            )
          }

          if (field.field === FieldType.Checkbox) {
            const Checkbox = fieldTypeComponentMap[FieldType.Checkbox]
            return (
              <Field key={fieldId}>
                <FieldLabel className="flex items-center gap-2" htmlFor={fieldId}>
                  <Checkbox
                    id={fieldId}
                    defaultChecked={field.defaultValue}
                    aria-invalid={!!fieldErrors?.length}
                    {...register(fieldName, registerOptions)}
                  />
                  {field.label}
                </FieldLabel>
                <FieldError errors={fieldErrors} />
              </Field>
            )
          }

          if (field.field === FieldType.Switch) {
            const Switch = fieldTypeComponentMap[FieldType.Switch]
            return (
              <Field key={fieldId}>
                <FieldLabel className="flex items-center gap-2" htmlFor={fieldId}>
                  <Switch
                    id={fieldId}
                    defaultChecked={field.defaultValue}
                    aria-invalid={!!fieldErrors?.length}
                    {...register(fieldName, registerOptions)}
                  />
                  {field.label}
                </FieldLabel>
                <FieldError errors={fieldErrors} />
              </Field>
            )
          }

          if (field.field === FieldType.Radio) {
            const Radio = fieldTypeComponentMap[FieldType.Radio]
            return (
              <FieldSet key={fieldId}>
                <FieldLegend>{field.label}</FieldLegend>
                <FieldGroup data-slot="radio-group">
                  {field.options.map((option) => {
                    const optionId = `${fieldId}-${option.value}`
                    return (
                      <Field key={optionId} orientation="horizontal">
                        <FieldLabel
                          className="flex items-center gap-2"
                          htmlFor={optionId}
                        >
                          <Radio
                            id={optionId}
                            value={option.value}
                            defaultChecked={field.defaultValue === option.value}
                            aria-invalid={!!fieldErrors?.length}
                            {...register(fieldName, registerOptions)}
                          />
                          {option.label}
                        </FieldLabel>
                      </Field>
                    )
                  })}
                </FieldGroup>
                <FieldError errors={fieldErrors} />
              </FieldSet>
            )
          }

          if (field.field === FieldType.Button) {
            const Button = fieldTypeComponentMap[FieldType.Button]
            return (
              <Button key={fieldId} name={field.name} type="submit">
                {field.label}
              </Button>
            )
          }

          return null
        })}
      </FieldGroup>
    </form>
  )
}
