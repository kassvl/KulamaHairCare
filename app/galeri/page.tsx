import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { galleryItems } from '@/lib/content'

const tints = [
  'from-[#5C3A28] to-[#2A1810]',
  'from-[#A24E2A] to-[#3A1B14]',
  'from-[#C97B3F] to-[#5C3A28]',
  'from-[#3A1B14] to-[#1A0A06]',
  'from-[#8C6448] to-[#3A1B14]',
  'from-[#D9A441] to-[#A24E2A]',
]

export default function GalleryPage() {
  return (
    <>
      <Section
        eyebrow="gallery"
        title={
          <>
            The <span className="font-script not-italic text-[var(--color-brand-clay)]">looks</span> we&rsquo;ve laid.
          </>
        }
        description="A small archive of recent appointments. Each photo is a real KULAMA seat, in real Wrocław light."
        className="pt-40 md:pt-44"
      >
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, i) => (
            <li
              key={item.caption}
              className={
                'group relative aspect-[4/5] overflow-hidden rounded-3xl border border-[rgba(58,27,20,0.12)] bg-gradient-to-br ' +
                tints[i % tints.length]
              }
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(217,164,65,0.18),transparent_55%)]" />
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <p className="font-script text-2xl text-[var(--color-brand-gold)]">
                  {item.tag}
                </p>
                <p className="font-display text-xl italic text-[var(--color-paper)]">
                  {item.caption}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-xl text-sm text-[var(--color-ink-500)]">
          Want a closer look? Follow{' '}
          <a
            href="https://instagram.com/kulama_braids"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[var(--color-ink-900)] underline-offset-4 hover:underline"
          >
            @kulama_braids
          </a>{' '}
          for behind-the-chair stories and weekly archives.
        </p>
      </Section>

      <Section
        eyebrow="ready when you are"
        title="See yourself in the chair."
      >
        <Link href="/rezervasyon" className="btn btn-primary">
          Book a style <ArrowUpRight size={16} />
        </Link>
      </Section>
    </>
  )
}
