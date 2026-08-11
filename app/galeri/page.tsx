import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { galleryItems } from '@/lib/content'

/** Staggered column offsets — the wave that keeps the grid from reading as a table. */
const lift = ['lg:mt-0', 'lg:mt-14', 'lg:mt-28']

export default function GalleryPage() {
  return (
    <>
      <Section
        eyebrow="gallery"
        title={
          <>
            The{' '}
            <span className="font-script not-italic pe-3 text-[var(--color-brand-clay)]">
              looks
            </span>{' '}
            we&rsquo;ve laid.
          </>
        }
        description="A small archive of recent appointments. Each photo is a real KULAMA seat, in real Wrocław light."
        className="pt-40 md:pt-44"
      >
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {galleryItems.map((item, i) => (
            <li key={item.caption} className={`tile group aspect-[4/5] ${lift[i % 3]}`}>
              <Image
                src={item.image}
                alt={item.caption}
                fill
                sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
                className="tile-media object-cover"
                priority={i < 2}
              />
              {/* Legibility scrim under the caption */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[rgba(0,0,0,0.7)] to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span className="index-numeral">{String(i + 1).padStart(2, '0')}</span>
                <p className="font-script text-2xl text-[var(--color-brand-gold)]">{item.tag}</p>
                <p className="font-display text-xl italic text-[var(--color-paper)]">
                  {item.caption}
                </p>
              </div>
              {/* Hairline that draws itself on hover */}
              <span className="pointer-events-none absolute inset-4 rounded-2xl border border-[rgba(244,236,226,0)] transition-colors duration-500 group-hover:border-[rgba(217,164,65,0.45)]" />
            </li>
          ))}
        </ul>

        <p className="mt-14 max-w-xl text-sm text-[var(--color-ink-500)]">
          Want a closer look? Follow{' '}
          <a
            href="https://instagram.com/kulama_hair_care"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[var(--color-ink-900)] underline-offset-4 hover:underline"
          >
            @kulama_hair_care
          </a>{' '}
          for behind-the-chair stories and weekly archives.
        </p>
      </Section>

      <Section eyebrow="ready when you are" title="See yourself in the chair.">
        <Link href="/rezervasyon" className="btn btn-primary">
          Book a style <ArrowUpRight size={16} />
        </Link>
      </Section>
    </>
  )
}
