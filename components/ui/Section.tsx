import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  id?: string
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  children: ReactNode
  className?: string
  align?: 'left' | 'center'
}

/**
 * Editorial section wrapper. Header (eyebrow + display title + description) +
 * children. Used across all routes.
 */
export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  align = 'left',
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn('relative scroll-mt-24 py-24 md:py-28', className)}
    >
      <div className="mx-auto max-w-[1400px] px-6">
        <header
          className={cn(
            'mb-12 max-w-3xl md:mb-16',
            align === 'center' && 'mx-auto text-center',
          )}
        >
          {eyebrow && <p className="kbd">{eyebrow}</p>}
          <h2 className="mt-4 font-display text-4xl italic font-medium leading-[1.05] tracking-tight text-[var(--color-ink-900)] md:text-6xl">
            {title}
          </h2>
          {description && (
            <p className="mt-5 text-base leading-relaxed text-[var(--color-ink-700)] md:text-lg">
              {description}
            </p>
          )}
        </header>
        {children}
      </div>
    </section>
  )
}
