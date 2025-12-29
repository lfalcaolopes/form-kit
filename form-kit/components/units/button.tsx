import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/form-kit/utils/index'

function Button({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(
        'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium',
        'bg-slate-900 text-white hover:bg-slate-800',
        'disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

export { Button }
