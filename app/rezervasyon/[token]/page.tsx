import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { BookingStatus, type PublicAppointment } from '@/components/booking/BookingStatus'
import { getAppointmentByToken } from '@/lib/store'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Your request · KULAMA',
  robots: { index: false, follow: false },
}

export default async function BookingStatusPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  const appointment = await getAppointmentByToken(token)

  if (!appointment) {
    return (
      <Section
        eyebrow="reservation"
        title="We can’t find that request."
        description="The link may be incomplete, or the request was removed. Starting a new one takes a minute."
        className="pt-40 md:pt-44"
      >
        <Link href="/rezervasyon" className="btn btn-primary">
          Book a style <ArrowUpRight size={16} />
        </Link>
      </Section>
    )
  }

  const initial: PublicAppointment = {
    serviceTitle: appointment.serviceTitle,
    serviceSlug: appointment.serviceSlug,
    date: appointment.date,
    time: appointment.time,
    name: appointment.name,
    status: appointment.status,
    proposedDate: appointment.proposedDate,
    proposedTime: appointment.proposedTime,
    adminMessage: appointment.adminMessage,
    createdAt: appointment.createdAt,
    updatedAt: appointment.updatedAt,
  }

  return (
    <Section
      eyebrow="your request"
      title={
        <>
          Your <span className="font-script not-italic text-[var(--color-brand-clay)]">seat</span>, so far.
        </>
      }
      description="Everything about your appointment lives on this page — including any change we suggest."
      className="pt-40 md:pt-44"
    >
      <BookingStatus token={token} initial={initial} />
    </Section>
  )
}
