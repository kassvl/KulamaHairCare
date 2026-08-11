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

  // A storage outage must not render as "your booking doesn't exist".
  let appointment: Awaited<ReturnType<typeof getAppointmentByToken>> = null
  let unreachable = false
  try {
    appointment = await getAppointmentByToken(token)
  } catch (err) {
    console.error('[booking] lookup failed', err)
    unreachable = true
  }

  if (unreachable) {
    return (
      <Section
        eyebrow="reservation"
        title="We can’t reach your booking right now."
        description="This is on our side, not yours — your request is still with us. Please refresh in a moment, or message the studio and we’ll confirm by hand."
        className="pt-40 md:pt-44"
      >
        <Link href="/iletisim" className="btn btn-primary">
          Contact the studio <ArrowUpRight size={16} />
        </Link>
      </Section>
    )
  }

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
