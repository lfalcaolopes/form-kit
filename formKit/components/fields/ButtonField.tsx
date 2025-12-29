import { Button } from '@/formKit/components/units/button'

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
