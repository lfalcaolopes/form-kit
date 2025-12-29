import { Button } from '@/form-kit/components/units/button'

export type ButtonFieldProps = {
  name: string
  label: string
}

export function ButtonField({ name, label }: ButtonFieldProps) {
  return (
    <Button name={name} type="submit">
      {label}
    </Button>
  )
}
