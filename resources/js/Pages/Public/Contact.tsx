import { Link, useForm, usePage } from '@inertiajs/react'
import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Camera,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  Megaphone,
  MessageCircle,
  NotebookPen,
  Phone,
  Plane,
  Send,
  Users,
  Video,
} from 'lucide-react'
import PublicLayout from '@/Layouts/PublicLayout'
import type { SharedProps } from '@/Types'
import { socialLinks } from '@/lib/socialLinks'

interface ContactProps {
  seo?: Record<string, string>
}

interface CountryResult {
  name: string
  slug: string
}

const services = [
  {
    title: 'Visas',
    description:
      'Get help understanding visa requirements, organizing your documents, and preparing applications for countries around the world.',
    href: '/services/visa-application-assistance',
    icon: Plane,
  },
  {
    title: 'Jobs in the Gulf Countries',
    description:
      'We help you prepare your CV, find suitable opportunities, and submit applications for jobs that match your skills.',
    href: '/services/gulf-job-application-assistance',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Scholarship Applications',
    description:
      'Explore scholarship opportunities and get support reviewing requirements, preparing documents, and submitting your application.',
    href: '/services/scholarship-application-assistance',
    icon: GraduationCap,
  },
  {
    title: 'Letters and Research Support',
    description:
      'Get ethical support with professional letters, research planning, language review, and reference formatting.',
    href: '/services/academic-research-support',
    icon: NotebookPen,
  },
  {
    title: 'Document Translation',
    description:
      'We help translate academic, personal, and professional documents to and from available languages.',
    href: '/services/document-translation',
    icon: Languages,
  },
  {
    title: 'Certificate Services',
    description:
      'Get help organizing, translating, attesting, and verifying certificates legally issued by schools and universities.',
    href: '/services/certificate-document-support',
    icon: BadgeCheck,
  },
]

export default function Contact({ seo }: ContactProps) {
  const { flash, siteSettings } = usePage<SharedProps>().props
  const contactEmail = siteSettings.contact_email || 'info@quteyba.com'
  const contactPhone1 = siteSettings.contact_phone_1 || '+255714241700'
  const contactPhone2 = siteSettings.contact_phone_2 || '+255621835048'
  const contactAddress = siteSettings.contact_address || 'TANZANIA, Zanzibar'
  const whatsappChatUrl = siteSettings.whatsapp_number
    ? `https://wa.me/${siteSettings.whatsapp_number}`
    : socialLinks.whatsappChat

  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    phone: '',
    country: '',
    subject: '',
    message: '',
  })

  const [countryQuery, setCountryQuery] = useState('')
  const [countryResults, setCountryResults] = useState<CountryResult[]>([])
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const countrySearchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (countrySearchTimeout.current) clearTimeout(countrySearchTimeout.current)
    countrySearchTimeout.current = setTimeout(() => {
      fetch(`/countries/search?q=${encodeURIComponent(countryQuery)}`)
        .then((res) => res.json())
        .then((results: CountryResult[]) => setCountryResults(results))
        .catch(() => setCountryResults([]))
    }, 250)
    return () => {
      if (countrySearchTimeout.current) clearTimeout(countrySearchTimeout.current)
    }
  }, [countryQuery])

  const selectCountry = (name: string) => {
    setData('country', name)
    setCountryQuery(name)
    setShowCountryDropdown(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/contact', {
      onSuccess: () => {
        reset()
        setCountryQuery('')
      },
    })
  }

  return (
    <PublicLayout>
      <div className="mx-auto max-w-7xl px-4 py-12">
        {flash.success && (
          <div className="mb-8 rounded-lg bg-green-50 border border-green-200 px-6 py-4">
            <p className="text-sm font-medium text-green-800">{flash.success}</p>
          </div>
        )}

        <section className="relative isolate overflow-hidden rounded-3xl bg-[#073B33] px-6 py-12 text-white sm:px-10 lg:px-14 lg:py-20">
          <img
            src="/hero.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#052f29]/95 via-[#073B33]/85 to-[#073B33]/25" />

          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium">
              <Megaphone className="h-4 w-4" />
              Advertise with us
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Advertise with us now</h1>
            <p className="mt-4 max-w-2xl leading-7 text-white/80">
              If you are looking for exceptional employees or have job openings, we are here to support you.
              We connect organizations with ambitious young people seeking employment and educational
              opportunities. Let us help you reach the right audience and achieve your goals.
            </p>
            <a
              href="#contact-form"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#E91E63] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#d81b60]"
            >
              Contact us
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        <section className="py-14">
          <div className="mb-8 max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#E91E63]">
              We help young people travel
            </p>
            <h2 className="text-3xl font-bold text-[#073B33]">What can we offer you?</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon

              return (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group rounded-2xl border border-border bg-white p-6 transition-all hover:-translate-y-1 hover:border-[#073B33]/30 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#073B33]/10 text-[#073B33] transition-colors group-hover:bg-[#073B33] group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#073B33]">{service.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#101828]/65">{service.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#E91E63]">
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              )
            })}
          </div>
        </section>

        <div id="contact-form" className="grid scroll-mt-24 gap-12 border-t border-border pt-14 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h1 className="mb-2 text-3xl font-bold text-[#073B33]">Contact Us</h1>
            <p className="mb-8 text-sm text-[#101828]/60">
              Do you want to advertise or explore new opportunities? Fill out the form and we will get back to
              you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[#101828]">
                  Full Name <span className="text-[#E91E63]">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-[#101828] placeholder:text-[#101828]/40 focus:border-[#073B33] focus:outline-none focus:ring-1 focus:ring-[#073B33]"
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#101828]">
                    Email <span className="text-[#E91E63]">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-[#101828] placeholder:text-[#101828]/40 focus:border-[#073B33] focus:outline-none focus:ring-1 focus:ring-[#073B33]"
                    placeholder="example@domain.com"
                    dir="ltr"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-[#101828]">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={data.phone}
                    onChange={(e) => setData('phone', e.target.value)}
                    className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-[#101828] placeholder:text-[#101828]/40 focus:border-[#073B33] focus:outline-none focus:ring-1 focus:ring-[#073B33]"
                    placeholder="+1 234 567 8900"
                    dir="ltr"
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                </div>
              </div>

              <div className="relative">
                <label htmlFor="country" className="mb-1.5 block text-sm font-medium text-[#101828]">
                  Country <span className="text-[#E91E63]">*</span>
                </label>
                <input
                  id="country"
                  type="text"
                  value={countryQuery}
                  onChange={(e) => {
                    setCountryQuery(e.target.value)
                    setData('country', e.target.value)
                    setShowCountryDropdown(true)
                  }}
                  onFocus={() => setShowCountryDropdown(true)}
                  onBlur={() => setTimeout(() => setShowCountryDropdown(false), 150)}
                  autoComplete="off"
                  placeholder="Search for your country"
                  className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-[#101828] placeholder:text-[#101828]/40 focus:border-[#073B33] focus:outline-none focus:ring-1 focus:ring-[#073B33]"
                />
                {showCountryDropdown && countryResults.length > 0 && (
                  <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-lg border border-border bg-white shadow-lg">
                    {countryResults.map((c) => (
                      <li key={c.slug}>
                        <button
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => selectCountry(c.name)}
                          className="block w-full px-4 py-2 text-left text-sm text-[#101828] hover:bg-primary-light"
                        >
                          {c.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                {errors.country && <p className="mt-1 text-xs text-red-600">{errors.country}</p>}
              </div>

              <div>
                <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-[#101828]">
                  Subject <span className="text-[#E91E63]">*</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  value={data.subject}
                  onChange={(e) => setData('subject', e.target.value)}
                  className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-[#101828] placeholder:text-[#101828]/40 focus:border-[#073B33] focus:outline-none focus:ring-1 focus:ring-[#073B33]"
                  placeholder="Subject of your message"
                />
                {errors.subject && <p className="mt-1 text-xs text-red-600">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-[#101828]">
                  Message <span className="text-[#E91E63]">*</span>
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={data.message}
                  onChange={(e) => setData('message', e.target.value)}
                  className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-[#101828] placeholder:text-[#101828]/40 focus:border-[#073B33] focus:outline-none focus:ring-1 focus:ring-[#073B33] resize-none"
                  placeholder="Write your message here..."
                />
                {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={processing}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#073B33] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#052b26] disabled:opacity-60"
                >
                  <Send className="h-4 w-4" />
                  {processing ? 'Sending...' : 'Send Message'}
                </button>

                <a
                  href={whatsappChatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#20bd5a]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
              </div>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-border bg-white p-6 space-y-6">
              <h3 className="text-lg font-bold text-[#073B33]">Contact Information</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#073B33]/10">
                    <Mail className="h-5 w-5 text-[#073B33]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#101828]">Email</p>
                    <a href={`mailto:${contactEmail}`} className="text-sm text-[#073B33] hover:underline" dir="ltr">
                      {contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#073B33]/10">
                    <Phone className="h-5 w-5 text-[#073B33]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#101828]">Phone Number</p>
                    <a href={`tel:${contactPhone1}`} className="block text-sm text-[#073B33] hover:underline" dir="ltr">
                      {contactPhone1}
                    </a>
                    <a href={`tel:${contactPhone2}`} className="block text-sm text-[#073B33] hover:underline" dir="ltr">
                      {contactPhone2}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#073B33]/10">
                    <MapPin className="h-5 w-5 text-[#073B33]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#101828]">Address</p>
                    <p className="text-sm text-[#101828]/60">{contactAddress}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-5">
                <h4 className="mb-3 text-sm font-semibold text-[#101828]">Follow Us</h4>
                <div className="flex items-center gap-3">
                  <a
                    href={socialLinks.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-[#101828]/60 transition-colors hover:border-[#073B33] hover:text-[#073B33]"
                    aria-label="X"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-[#101828]/60 transition-colors hover:border-[#073B33] hover:text-[#073B33]"
                    aria-label="Facebook"
                  >
                    <Users className="h-5 w-5" />
                  </a>
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-[#101828]/60 transition-colors hover:border-[#073B33] hover:text-[#073B33]"
                    aria-label="Instagram"
                  >
                    <Camera className="h-5 w-5" />
                  </a>
                  <a
                    href={socialLinks.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-[#101828]/60 transition-colors hover:border-[#073B33] hover:text-[#073B33]"
                    aria-label="Telegram"
                  >
                    <Send className="h-5 w-5" />
                  </a>
                  <a
                    href={socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-[#101828]/60 transition-colors hover:border-[#073B33] hover:text-[#073B33]"
                    aria-label="YouTube"
                  >
                    <Video className="h-5 w-5" />
                  </a>
                  <a
                    href={socialLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-[#101828]/60 transition-colors hover:border-[#073B33] hover:text-[#073B33]"
                    aria-label="WhatsApp Channel"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
