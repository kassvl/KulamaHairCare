import { VideoIntro } from '@/components/home/VideoIntro'
import { SplitHero } from '@/components/home/SplitHero'
import { MobileHero } from '@/components/home/MobileHero'
import { ServicesPreview } from '@/components/home/ServicesPreview'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import { CTA } from '@/components/home/CTA'

export default function HomePage() {
  return (
    <>
      <VideoIntro />
      <MobileHero />
      <SplitHero />
      <ServicesPreview />
      <WhyChooseUs />
      <CTA />
    </>
  )
}
