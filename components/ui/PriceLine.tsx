import { cn } from '@/lib/utils'

/**
 * One row of a salon price board: name, a dotted leader, the price. `tone`
 * picks the pairing for a light or a dark ground.
 */
export function PriceLine({
  name,
  note,
  price,
  tone = 'light',
}: {
  name: string
  note?: string | null
  price: string
  tone?: 'light' | 'dark'
}) {
  const dark = tone === 'dark'
  return (
    <div className="flex items-baseline gap-3">
      <dt className={cn('shrink-0', dark ? 'text-[var(--color-paper)]' : 'text-[var(--color-ink-900)]')}>
        {name}
        {note && (
          <span
            className={cn(
              'ml-2 text-sm',
              dark ? 'text-[rgba(241,232,216,0.55)]' : 'text-[var(--color-ink-500)]',
            )}
          >
            {note}
          </span>
        )}
      </dt>
      <span
        aria-hidden
        className={cn(
          'min-w-6 flex-1 translate-y-[-0.3em] border-b-2 border-dotted',
          dark ? 'border-[rgba(201,161,90,0.35)]' : 'border-[rgba(35,20,13,0.22)]',
        )}
      />
      <dd
        className={cn(
          'shrink-0 font-display text-[1.15rem] font-medium tabular-nums',
          dark ? 'text-[var(--color-brand-gold)]' : 'text-[var(--color-brand-bronze)]',
        )}
      >
        {price}
      </dd>
    </div>
  )
}
