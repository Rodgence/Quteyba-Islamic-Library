import { Link } from '@inertiajs/react'
import { ArrowRight } from 'lucide-react'
import PublicLayout from '@/Layouts/PublicLayout'
import { getLocalized } from '@/lib/localization'

interface ServiceItem {
  title: unknown
  slug: string
  short_description: unknown
  icon: string | null
  featured_image: { url: string; alt_text?: string } | null
  price: number | null
  price_currency: string | null
}

interface SEO {
  title?: string
  description?: string
}

interface Props {
  services: ServiceItem[]
  seo?: SEO
}

export default function ServicesPage({ services }: Props) {
  return (
    <PublicLayout>
      <div className="bg-primary-light py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-2xl font-bold text-[#073B33]">Our Services</h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.slug}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-sm"
            >
              {service.featured_image && (
                <img
                  src={service.featured_image.url}
                  alt={service.featured_image.alt_text || getLocalized(service.title)}
                  className="h-48 w-full object-cover"
                />
              )}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="mb-2 text-lg font-semibold text-[#101828]">
                  {getLocalized(service.title)}
                </h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-[#101828]/60 line-clamp-3">
                  {getLocalized(service.short_description)}
                </p>
                {service.price !== null && service.price !== undefined && (
                  <p className="mb-4 text-sm font-semibold text-[#073B33]">
                    {service.price} {service.price_currency || 'USD'}
                  </p>
                )}
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#073B33] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#052e28]"
                >
                  Request Service
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PublicLayout>
  )
}
