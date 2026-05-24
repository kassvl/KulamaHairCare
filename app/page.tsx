import { SplitHero } from '@/components/home/SplitHero'
import { ServicesPreview } from '@/components/home/ServicesPreview'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import { CTA } from '@/components/home/CTA'

export default function HomePage() {
  return (
    <>
      <SplitHero />
      <ServicesPreview />
      <WhyChooseUs />
      <CTA />
    </>
  )
}
