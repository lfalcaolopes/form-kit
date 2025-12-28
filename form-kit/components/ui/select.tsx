import * as React from 'react'

import { cn } from '@/form-kit/utils/index'

const Select = React.forwardRef<
  HTMLSelectElement,
  React.ComponentProps<'select'>
>(({ className, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      'h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900',
      'focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  />
))

Select.displayName = 'Select'

export { Select }
