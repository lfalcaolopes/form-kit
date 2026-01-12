import { cn } from '@/formKit/utils'

type SectionHeaderProps = {
  title?: string
  description?: string
  titleClassName?: string
  descriptionClassName?: string
  className?: string
}

function SectionHeader({
  title,
  description,
  titleClassName,
  descriptionClassName,
  className,
}: SectionHeaderProps) {
  if (!title && !description) {
    return null
  }

  return (
    <div className={cn('flex flex-col gap-1 pt-2', className)}>
      {title && (
        <h3
          data-slot="section-title"
          className={cn('text-base font-semibold text-foreground', titleClassName)}
        >
          {title}
        </h3>
      )}
      {description && (
        <p
          data-slot="section-description"
          className={cn('text-sm text-muted-foreground', descriptionClassName)}
        >
          {description}
        </p>
      )}
    </div>
  )
}

export { SectionHeader }
