import type { ReactNode } from 'react'

import { cn } from '@/formKit/utils'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from '@/formKit/components/fields/Field'

type ReadOnlyFieldProps = {
  label: string
  value?: ReactNode | ReactNode[]
  className?: string
  valueClassName?: string
  helpText?: ReactNode
  icon?: ReactNode
}

function getContent({
  value,
  children,
  valueClassName,
}: {
  value?: ReactNode | ReactNode[]
  children?: ReactNode
  valueClassName?: string
}) {
  const valueToDisplay = Array.isArray(value)
    ? Array.from(new Set(value)).map((item, index) => (
        <span key={index}>
          {item}
          <br />
        </span>
      ))
    : children ?? value

  return (
    <div className={cn('text-sm text-slate-900', valueClassName)}>
      {valueToDisplay}
    </div>
  )
}

export function ReadOnlyField({
  label,
  value,
  className,
  valueClassName,
  helpText,
  icon,
  children,
}: ReadOnlyFieldProps & { children?: ReactNode }) {
  return (
    <Field data-disabled={true} className={className}>
      <FieldLabel>
        {icon}
        {label}
      </FieldLabel>
      <FieldContent>
        {getContent({ value, children, valueClassName })}
        {helpText && <FieldDescription>{helpText}</FieldDescription>}
      </FieldContent>
    </Field>
  )
}
