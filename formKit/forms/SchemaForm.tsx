import { Fragment, useId, useMemo, type ReactNode } from 'react'
import {
  FormProvider,
  useForm,
  useWatch,
  type UseFormReturn,
  type DefaultValues,
  type FieldError as RHFFieldError,
  type FieldErrors,
  type FieldValues,
  type Path,
} from 'react-hook-form'

import {
  FieldType,
  type FormFieldConfig,
  type FormSchema,
  type FormValuesFromSchema,
  LayoutStrategy,
} from '@/formKit/schema'
import { fieldRegistry } from '@/formKit/registry'
import { FieldGroup } from '@/formKit/components/fields/Field'
import { FormHeader } from '@/formKit/components/blocks/formHeader'
import { SectionHeader } from '@/formKit/components/blocks/sectionHeader'

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

type RenderableFieldEntry = {
  field: FormFieldConfig
  index: number
  content: ReactNode
}

const formatEnumLabel = (value: string) => {
  const normalized = value
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .trim()

  return normalized
    .split(' ')
    .filter(Boolean)
    .map(
      (part) => `${part.charAt(0).toUpperCase()}${part.slice(1).toLowerCase()}`,
    )
    .join(' ')
}

const resolveEnumOptions = (enumValues: Record<string, string>) =>
  Object.entries(enumValues).map(([key, value]) => ({
    label: formatEnumLabel(key),
    value,
  }))

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
  const watchedValues = useWatch({ control: form.control }) as FormValues<TSchema>
  const {
    handleSubmit,
    formState: { errors },
  } = form
  const resolveFieldRules = (field: FormFieldConfig) => {
    if (!field.getIsRequired) {
      return field.rules
    }
    const isRequired = field.getIsRequired({ values: watchedValues })
    if (isRequired) {
      return {
        ...field.rules,
        required: field.rules?.required ?? 'Esse campo é obrigatorio',
      }
    }
    if (!field.rules) {
      return undefined
    }
    return {
      ...field.rules,
      required: false,
    }
  }

  const resolveFieldOptions = (field: FormFieldConfig) => {
    if ('getOptions' in field && field.getOptions) {
      const resolvedOptions = field.getOptions({ values: watchedValues })
      if (resolvedOptions !== undefined) {
        return resolvedOptions
      }
    }
    if ('options' in field && field.options?.length) {
      return field.options
    }
    if ('enumOptions' in field && field.enumOptions) {
      return resolveEnumOptions(field.enumOptions)
    }
    return []
  }

  const fieldEntries = Object.values(schema).map((field, index) => ({
    field,
    index,
  }))
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

  const canRenderField = (field: FormFieldConfig) => {
    const shouldHide =
      field.hidden ||
      (field.shouldHide ? field.shouldHide({ values: watchedValues }) : false)

    if (shouldHide) {
      return false
    }

    if (field.permission && hasPermission) {
      return hasPermission(field.permission)
    }

    return true
  }

  const renderFieldContent = (field: FormFieldConfig): ReactNode => {
    const fieldName = field.name as Path<FormValues<TSchema>>
    const fieldId = `${baseId}-${field.name}`
    const fieldErrors = getFieldErrors(errors, fieldName)
    const fieldRules = resolveFieldRules(field)

    const fieldElement = (() => {
      if (field.field === FieldType.INPUT) {
        const Input = fieldRegistry[FieldType.INPUT]
        return (
          <Input
            fieldId={fieldId}
            name={fieldName}
            label={field.label}
            helpText={field.helpText}
            icon={field.icon}
            readOnly={field.readOnly}
            disabled={field.disabled}
            type={field.type}
            placeholder={field.placeholder}
            mask={field.mask}
            inputBefore={field.inputBefore}
            inputAfter={field.inputAfter}
            rules={fieldRules}
            errors={fieldErrors}
          />
        )
      }

      if (field.field === FieldType.SECRET_TEXT) {
        const Input = fieldRegistry[FieldType.SECRET_TEXT]
        return (
          <Input
            fieldId={fieldId}
            name={fieldName}
            label={field.label}
            helpText={field.helpText}
            icon={field.icon}
            readOnly={field.readOnly}
            disabled={field.disabled}
            type="password"
            placeholder={field.placeholder}
            mask={field.mask}
            inputBefore={field.inputBefore}
            inputAfter={field.inputAfter}
            rules={fieldRules}
            errors={fieldErrors}
          />
        )
      }

      if (field.field === FieldType.TEXTAREA) {
        const Textarea = fieldRegistry[FieldType.TEXTAREA]
        return (
          <Textarea
            fieldId={fieldId}
            name={fieldName}
            label={field.label}
            helpText={field.helpText}
            icon={field.icon}
            readOnly={field.readOnly}
            disabled={field.disabled}
            placeholder={field.placeholder}
            rules={fieldRules}
            errors={fieldErrors}
          />
        )
      }

      if (field.field === FieldType.SELECT) {
        const Select = fieldRegistry[FieldType.SELECT]
        const options = resolveFieldOptions(field)
        return (
          <Select
            fieldId={fieldId}
            name={fieldName}
            label={field.label}
            helpText={field.helpText}
            icon={field.icon}
            readOnly={field.readOnly}
            disabled={field.disabled}
            options={options}
            defaultValue={field.defaultValue}
            rules={fieldRules}
            errors={fieldErrors}
          />
        )
      }

      if (field.field === FieldType.CHECKBOX) {
        const Checkbox = fieldRegistry[FieldType.CHECKBOX]
        const options = resolveFieldOptions(field)
        return (
          <Checkbox
            fieldId={fieldId}
            name={fieldName}
            label={field.label}
            helpText={field.helpText}
            icon={field.icon}
            readOnly={field.readOnly}
            disabled={field.disabled}
            options={options}
            defaultValue={field.defaultValue}
            rules={fieldRules}
            errors={fieldErrors}
          />
        )
      }

      if (field.field === FieldType.SINGLE_CHECKBOX) {
        const SingleCheckbox = fieldRegistry[FieldType.SINGLE_CHECKBOX]
        return (
          <SingleCheckbox
            fieldId={fieldId}
            name={fieldName}
            label={field.label}
            helpText={field.helpText}
            icon={field.icon}
            readOnly={field.readOnly}
            disabled={field.disabled}
            defaultChecked={field.defaultValue}
            rules={fieldRules}
            errors={fieldErrors}
          />
        )
      }

      if (field.field === FieldType.SWITCH) {
        const Switch = fieldRegistry[FieldType.SWITCH]
        return (
          <Switch
            fieldId={fieldId}
            name={fieldName}
            label={field.label}
            helpText={field.helpText}
            icon={field.icon}
            readOnly={field.readOnly}
            disabled={field.disabled}
            defaultChecked={field.defaultValue}
            rules={fieldRules}
            errors={fieldErrors}
          />
        )
      }

      if (field.field === FieldType.RADIO) {
        const Radio = fieldRegistry[FieldType.RADIO]
        const options = resolveFieldOptions(field)
        return (
          <Radio
            fieldId={fieldId}
            name={fieldName}
            label={field.label}
            helpText={field.helpText}
            icon={field.icon}
            readOnly={field.readOnly}
            disabled={field.disabled}
            options={options}
            defaultValue={field.defaultValue}
            rules={fieldRules}
            errors={fieldErrors}
          />
        )
      }

      if (field.field === FieldType.BUTTON) {
        const Button = fieldRegistry[FieldType.BUTTON]
        return <Button name={field.name} label={field.label} />
      }

      if (field.field === FieldType.CUSTOM) {
        const Custom = fieldRegistry[FieldType.CUSTOM]
        return (
          <Custom
            fieldId={fieldId}
            name={fieldName}
            label={field.label}
            helpText={field.helpText}
            icon={field.icon}
            readOnly={field.readOnly}
            disabled={field.disabled}
            rules={fieldRules}
            component={field.component}
            componentProps={field.componentProps}
            errors={fieldErrors}
          />
        )
      }

      return null
    })()

    if (!fieldElement) {
      return null
    }

    return (
      <>
        {(field.titleBefore || field.descriptionBefore) && (
          <SectionHeader
            title={field.titleBefore}
            description={field.descriptionBefore}
            titleClassName={field.titleBeforeClassName}
            descriptionClassName={field.descriptionBeforeClassName}
          />
        )}
        {field.componentBefore}
        {fieldElement}
        {field.componentAfter}
      </>
    )
  }

  const visibleFields = fieldEntries.filter(({ field }) => canRenderField(field))

  const renderableFields = visibleFields
    .map((entry) => ({
      ...entry,
      content: renderFieldContent(entry.field),
    }))
    .filter(
      (entry): entry is RenderableFieldEntry =>
        entry.content !== null && entry.content !== undefined,
    )

  const resolveLayoutStrategy = (
    entries: Array<{ field: FormFieldConfig }>,
  ): LayoutStrategy => {
    const hasRow = entries.some(({ field }) => typeof field.row === 'number')
    const hasColumn = entries.some(
      ({ field }) => typeof field.column === 'number',
    )

    if (hasRow && hasColumn) {
      console.warn(
        'SchemaForm: row and column layout metadata cannot be mixed. Falling back to free layout.',
      )
      return LayoutStrategy.FREE
    }

    if (hasRow) {
      const hasMissing = entries.some(
        ({ field }) => typeof field.row !== 'number',
      )
      if (hasMissing) {
        console.warn(
          'SchemaForm: every visible field must declare a row when using row layout. Falling back to free layout.',
        )
        return LayoutStrategy.FREE
      }
      return LayoutStrategy.ROW
    }

    if (hasColumn) {
      const hasMissing = entries.some(
        ({ field }) => typeof field.column !== 'number',
      )
      if (hasMissing) {
        console.warn(
          'SchemaForm: every visible field must declare a column when using column layout. Falling back to free layout.',
        )
        return LayoutStrategy.FREE
      }
      return LayoutStrategy.COLUMN
    }

    return LayoutStrategy.FREE
  }

  const layoutStrategy = resolveLayoutStrategy(renderableFields)

  const renderFields = () => {
    if (layoutStrategy === LayoutStrategy.ROW) {
      const rows = new Map<number, typeof renderableFields>()
      renderableFields.forEach((entry) => {
        const row = entry.field.row ?? 0
        if (!rows.has(row)) {
          rows.set(row, [])
        }
        rows.get(row)?.push(entry)
      })

      return [...rows.entries()]
        .sort(([rowA], [rowB]) => rowA - rowB)
        .map(([row, rowEntries]) => (
          <div key={`row-${row}`} className="flex flex-col gap-7 md:flex-row">
            {rowEntries
              .sort((a, b) => a.index - b.index)
              .map((entry) => (
                <div
                  key={`${baseId}-${entry.field.name}`}
                  className="flex min-w-0 flex-1 flex-col gap-7"
                >
                  {entry.content}
                </div>
              ))}
          </div>
        ))
    }

    if (layoutStrategy === LayoutStrategy.COLUMN) {
      const columns = new Map<number, typeof renderableFields>()
      renderableFields.forEach((entry) => {
        const column = entry.field.column ?? 0
        if (!columns.has(column)) {
          columns.set(column, [])
        }
        columns.get(column)?.push(entry)
      })

      return (
        <div className="flex flex-col gap-7 md:flex-row">
          {[...columns.entries()]
            .sort(([columnA], [columnB]) => columnA - columnB)
            .map(([column, columnEntries]) => (
              <div
                key={`column-${column}`}
                className="flex min-w-0 flex-1 flex-col gap-7"
              >
                {columnEntries
                  .sort((a, b) => a.index - b.index)
                  .map((entry) => (
                    <div
                      key={`${baseId}-${entry.field.name}`}
                      className="flex min-w-0 flex-1 flex-col gap-7"
                    >
                      {entry.content}
                    </div>
                  ))}
              </div>
            ))}
        </div>
      )
    }

    return renderableFields.map((entry) => (
      <Fragment key={`${baseId}-${entry.field.name}`}>
        {entry.content}
      </Fragment>
    ))
  }

  return (
    <FormProvider {...form}>
      <form
        className={className}
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
      >
        <FormHeader title={title} info={formInfo} />
        <FieldGroup>{renderFields()}</FieldGroup>
      </form>
    </FormProvider>
  )
}
