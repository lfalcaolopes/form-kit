import * as React from 'react'

import { cn } from '@/form-kit/utils/index'

const Switch = React.forwardRef<
  HTMLInputElement,
  Omit<React.ComponentProps<'input'>, 'type'>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    type="checkbox"
    role="switch"
    className={cn(
      'relative inline-flex h-6 w-11 appearance-none rounded-full bg-slate-200 transition-colors',
      'before:absolute before:left-1 before:top-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-transform',
      'checked:bg-slate-900 checked:before:translate-x-5',
      'focus:outline-none focus:ring-2 focus:ring-slate-200',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  />
))

Switch.displayName = 'Switch'

export { Switch }
