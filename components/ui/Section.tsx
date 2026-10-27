import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/ui/Reveal'

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
        <Reveal
          className={cn(
            'mb-12 max-w-3xl md:mb-16',
            align === 'center' && 'mx-auto text-center',
          )}
        >
          <header>
            {eyebrow && (
              <p className="text-sm font-medium text-[var(--color-brand-bronze)]">
                {eyebrow.charAt(0).toUpperCase() + eyebrow.slice(1)}
              </p>
            )}
            <h2 className="mt-3 font-display text-[2.6rem] font-medium leading-[1.02] tracking-[-0.02em] text-[var(--color-ink-900)] md:text-[4.25rem]">
              {title}
            </h2>
            {description && (
              <p className="mt-5 text-base leading-relaxed text-[var(--color-ink-700)] md:text-lg">
                {description}
              </p>
            )}
          </header>
        </Reveal>
        <Reveal delay={0.08}>{children}</Reveal>
      </div>
    </section>
  )
}
