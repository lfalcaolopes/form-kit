import * as React from 'react'

import { cn } from '@/form-kit/utils/index'

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>(({ className, type = 'text', ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(
      'w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900',
      'placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  />
))

Input.displayName = 'Input'

export { Input }
