import type { ReactNode } from 'react'

import { cn } from '@/formKit/utils'

type FormHeaderProps = {
  title?: ReactNode
  info?: ReactNode
  className?: string
}

function FormHeader({ title, info, className }: FormHeaderProps) {
  if (!title && !info) {
    return null
  }

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {title && (
        <h2
          data-slot="form-title"
          className="text-xl font-semibold text-foreground"
        >
          {title}
        </h2>
      )}
      {info && (
        <p data-slot="form-info" className="text-sm text-muted-foreground">
          {info}
        </p>
      )}
    </div>
  )
}

export { FormHeader }
