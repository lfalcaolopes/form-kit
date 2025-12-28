import * as React from 'react'

import { cn } from '@/form-kit/utils/index'

const Checkbox = React.forwardRef<
  HTMLInputElement,
  Omit<React.ComponentProps<'input'>, 'type'>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    type="checkbox"
    className={cn(
      'h-4 w-4 rounded border border-slate-300 text-slate-900',
      'focus:outline-none focus:ring-2 focus:ring-slate-200',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  />
))

Checkbox.displayName = 'Checkbox'

export { Checkbox }
