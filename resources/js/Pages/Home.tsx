import { Link, usePage } from '@inertiajs/react'
import type { SharedProps } from '@/Types'
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Briefcase,
  Globe,
  MessageCircle,
  Calendar,
  MapPin,
  Clock,
  Wrench,
  Plane,
  Users,
  Heart,
  Award,
  Languages,
  LayoutGrid,
  BadgeCheck,
} from 'lucide-react'
import PublicLayout from '@/Layouts/PublicLayout'
import { Head } from '@inertiajs/react'
import { getLocalized } from '@/lib/localization'

interface HomeProps {
  featured: any[]
  latest: any[]
  services: any[]
  stats: { label: string; value: number }[]
  seo: { title: string; description: string }
}

const categoryLinks = [
  { name: 'Scholarships', icon: GraduationCap, href: '/opportunities?type=scholarship' },
  { name: 'Jobs', icon: Briefcase, href: '/opportunities?type=job' },
  { name: 'Internships', icon: BookOpen, href: '/opportunities?type=internship' },
  { name: 'Visas', icon: Plane, href: '/opportunities?type=visa' },
  { name: 'Conferences', icon: Users, href: '/opportunities?type=conference' },
  { name: 'Volunteering', icon: Heart, href: '/opportunities?type=volunteering' },
  { name: 'Certificate', icon: Award, href: '/opportunities?type=certificate' },
  { name: 'Document Translation', icon: Languages, href: '/opportunities?type=document-translation' },
  { name: 'Opportunities', icon: LayoutGrid, href: '/opportunities' },
  { name: 'Premium Jobs', icon: BadgeCheck, href: '/opportunities?type=premium-job' },
]

const steps = [
  { step: 1, title: 'Find your opportunity', description: 'Browse thousands of available opportunities by field and interest' },
  { step: 2, title: 'Prepare your application', description: 'Use our services to prepare and professionally translate your documents' },
  { step: 3, title: 'Submit your application', description: 'Send your application to the granting body and track its status' },
  { step: 4, title: 'Get started', description: 'Receive your acceptance and begin your academic or professional journey' },
]

export default function HomePage({ featured, latest, services, stats, seo }: HomeProps) {
  const { siteSettings } = usePage<SharedProps>().props
  const whatsappChatUrl = siteSettings.whatsapp_number
    ? `https://wa.me/${siteSettings.whatsapp_number}`
    : 'https://wa.me/255714241700'
  const statIcons = [BookOpen, Globe, GraduationCap]

  return (
    <PublicLayout>
      <Head title={seo.title}>
        <meta name="description" content={seo.description} />
      </Head>

      <section className="relative overflow-hidden bg-black text-white">
        <img
          src="/hero.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-28">
          <div className="max-w-2xl">
            <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Your opportunity to study, work, and travel starts here
            </h1>
            <p className="mb-8 text-base leading-relaxed opacity-90 sm:text-lg">
              Discover the latest scholarships, jobs, internships, and visa opportunities from trusted sources around the world.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/opportunities"
                className="inline-flex items-center gap-2 rounded-lg bg-[#E91E63] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c2185b]"
              >
                Browse all opportunities
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {latest && latest.length > 0 && (
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#073B33]">Latest Opportunities</h2>
              <Link
                href="/opportunities"
                className="inline-flex items-center gap-1 rounded-lg border border-[#E91E63] px-4 py-2 text-sm font-semibold text-[#E91E63] transition-colors hover:bg-[#E91E63]/5"
              >
                View all
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latest.map((opp) => (
                <Link
                  key={opp.id}
                  href={`/opportunities/${opp.slug}`}
                  className="group overflow-hidden rounded-2xl border border-border bg-white transition-colors hover:border-[#073B33]/30"
                >
                  <div className="aspect-video bg-primary-light">
                    {opp.featured_image?.url ? (
                      <img src={opp.featured_image.url} alt={opp.featured_image.alt || ''} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[#073B33]/20">
                        <BookOpen className="h-12 w-12" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="mb-2 flex items-center gap-2">
                      {opp.opportunity_type && (
                        <span className="inline-block rounded-md bg-[#E91E63]/10 px-2 py-0.5 text-xs font-medium text-[#E91E63]">
                          {getLocalized(opp.opportunity_type.name)}
                        </span>
                      )}
                      {opp.country && (
                        <span className="inline-flex items-center gap-1 text-xs text-[#101828]/50">
                          <MapPin className="h-3 w-3" />
                          {getLocalized(opp.country.name)}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-semibold text-[#101828] group-hover:text-[#073B33] line-clamp-2">
                      {getLocalized(opp.title)}
                    </h3>
                    {opp.excerpt && (
                      <p className="mt-2 text-sm text-[#101828]/60 line-clamp-2">
                        {getLocalized(opp.excerpt)}
                      </p>
                    )}
                    {opp.application_deadline && (
                      <p className="mt-3 inline-flex items-center gap-1 text-xs text-[#101828]/50">
                        <Clock className="h-3 w-3" />
                        {opp.application_deadline}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-b border-border bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-[#073B33]">
            Browse Opportunities by Type
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {categoryLinks.map(({ name, icon: Icon, href }) => (
              <Link
                key={name}
                href={href}
                className="group flex min-h-28 flex-col items-center justify-center rounded-2xl border border-border bg-white px-3 py-6 text-center transition-all hover:-translate-y-1 hover:border-[#E91E63]/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E91E63] focus-visible:ring-offset-2"
              >
                <Icon className="mb-4 h-7 w-7 text-[#E91E63] transition-transform group-hover:scale-110" />
                <span className="text-sm font-semibold text-[#101828] group-hover:text-[#073B33]">
                  {name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {services && services.length > 0 && (
        <section className="bg-primary-light py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#073B33]">Our Services</h2>
              <Link
                href="/services"
                className="inline-flex items-center gap-1 rounded-lg border border-[#E91E63] px-4 py-2 text-sm font-semibold text-[#E91E63] transition-colors hover:bg-[#E91E63]/5"
              >
                View all
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <Link
                  key={s.id}
                  href={`/services/${s.slug}`}
                  className="group overflow-hidden rounded-2xl border border-border bg-white transition-colors hover:border-[#073B33]/30"
                >
                  {s.featured_image?.url && (
                    <div className="aspect-video overflow-hidden bg-primary-light">
                      <img
                        src={s.featured_image.url}
                        alt={s.featured_image.alt || getLocalized(s.title)}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {!s.featured_image?.url && (
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E91E63]/10 text-[#E91E63]">
                        <Wrench className="h-5 w-5" />
                      </div>
                    )}
                    <h3 className="mb-2 text-base font-semibold text-[#101828] group-hover:text-[#073B33]">
                      {getLocalized(s.title)}
                    </h3>
                    <p className="line-clamp-3 text-sm leading-relaxed text-[#101828]/60">
                      {getLocalized(s.short_description)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {featured && featured.length > 0 && (
        <section className="bg-primary-light py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-8 text-2xl font-bold text-[#073B33]">Featured Opportunities</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((opp) => (
                <Link
                  key={opp.id}
                  href={`/opportunities/${opp.slug}`}
                  className="group overflow-hidden rounded-2xl border border-border bg-white transition-colors hover:border-[#073B33]/30"
                >
                  <div className="aspect-video bg-primary-light">
                    {opp.featured_image?.url ? (
                      <img src={opp.featured_image.url} alt={opp.featured_image.alt || ''} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[#073B33]/20">
                        <BookOpen className="h-12 w-12" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    {opp.opportunity_type && (
                      <span className="inline-block rounded-md bg-[#E91E63]/10 px-2 py-0.5 text-xs font-medium text-[#E91E63]">
                        {getLocalized(opp.opportunity_type.name)}
                      </span>
                    )}
                    <h3 className="mt-2 text-base font-semibold text-[#101828] group-hover:text-[#073B33] line-clamp-2">
                      {getLocalized(opp.title)}
                    </h3>
                    <p className="mt-1 text-sm text-[#101828]/60 line-clamp-2">
                      {getLocalized(opp.excerpt)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-10 text-center text-2xl font-bold text-[#073B33]">How to get started?</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.step} className="relative text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#073B33] text-lg font-bold text-white">
                  {s.step}
                </div>
                <h3 className="mb-2 font-semibold text-[#101828]">{s.title}</h3>
                <p className="text-sm leading-relaxed text-[#101828]/60">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#073B33] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold">Need some help?</h2>
          <p className="mb-6 text-sm opacity-80">Contact us via WhatsApp for a free consultation</p>
          <Link
            href={whatsappChatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#20bd5a]"
          >
            <MessageCircle className="h-5 w-5" />
            Contact us on WhatsApp
          </Link>
        </div>
      </section>

      <section className="border-y border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid grid-cols-3 gap-6">
            {stats.map((stat, i) => {
              const Icon = statIcons[i] || BookOpen
              return (
                <div key={stat.label} className="text-center">
                  <Icon className="mx-auto mb-2 h-6 w-6 text-[#E91E63]" />
                  <div className="text-2xl font-bold text-[#073B33]">{stat.value.toLocaleString('en-US')}+</div>
                  <div className="text-sm text-[#101828]/60">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
