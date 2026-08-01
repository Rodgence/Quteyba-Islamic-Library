import { Link, usePage } from '@inertiajs/react'
import { useState } from 'react'
import { ArrowLeft, Check, FileText, MessageCircle, Send } from 'lucide-react'
import PublicLayout from '@/Layouts/PublicLayout'
import type { SharedProps } from '@/Types'
import { socialLinks } from '@/lib/socialLinks'
import { getLocalized } from '@/lib/localization'

interface ServiceItem {
  title: unknown
  slug: string
  short_description: unknown
  content: string
  deliverables: string | null
  required_documents: string | null
  process_steps: string | null
  price: number | null
  price_currency: string | null
  faq: string | null
  whatsapp_url: string | null
  featured_image: { url: string; alt_text?: string } | null
}

interface SEO {
  title?: string
  description?: string
}

interface Props {
  service: ServiceItem
  seo?: SEO
}

function parseJsonArray(value: string | null): string[] {
  if (!value) return []
  try {
    const parsed = JSON.parse(value)
    if (Array.isArray(parsed)) {
      return parsed.map((item: string | { ar?: string; en?: string }) =>
        typeof item === 'string' ? item : (item?.en || item?.ar || '')
      )
    }
    return []
  } catch {
    return []
  }
}

function parseFaq(value: string | null): { question: string; answer: string }[] {
  if (!value) return []
  try {
    const parsed = JSON.parse(value)
    if (Array.isArray(parsed)) {
      return parsed.map((item: { question?: string; answer?: string }) => {
        const q = typeof item.question === 'string' ? JSON.parse(item.question) : item.question
        const a = typeof item.answer === 'string' ? JSON.parse(item.answer) : item.answer
        return {
          question: q?.en || q?.ar || item.question || '',
          answer: a?.en || a?.ar || item.answer || '',
        }
      })
    }
    return []
  } catch {
    return []
  }
}

export default function ServiceDetailPage({ service }: Props) {
  const { locale, siteSettings } = usePage<SharedProps>().props
  const whatsappChatUrl = service.whatsapp_url || (siteSettings.whatsapp_number
    ? `https://wa.me/${siteSettings.whatsapp_number}`
    : 'https://wa.me/255714241700')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const deliverables = parseJsonArray(service.deliverables)
  const requiredDocs = parseJsonArray(service.required_documents)
  const processSteps = parseJsonArray(service.process_steps)
  const faqItems = parseFaq(service.faq)

  const serviceTitle = getLocalized(service.title)
  const whatsappRequestNumber = siteSettings.whatsapp_number || socialLinks.whatsappNumber
  const whatsappRequestMessage = `Hello Abuu Qutaybah, 👋\n\nI would like to request the *${serviceTitle}* service through your library.\n\n💵 How much is the fee for this service?\n\nThank you for your time and assistance. I look forward to your reply.`
  const whatsappRequestUrl = `https://wa.me/${whatsappRequestNumber}?text=${encodeURIComponent(whatsappRequestMessage)}`

  return (
    <PublicLayout>
      <div className="bg-primary-light py-8">
        <div className="mx-auto max-w-7xl px-4">
          <nav className="mb-4 flex items-center gap-2 text-sm text-[#101828]/60">
            <Link href="/" className="hover:text-[#073B33]">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-[#073B33]">Services</Link>
            <span>/</span>
            <span className="text-[#101828]">{getLocalized(service.title)}</span>
          </nav>
          <h1 className="text-2xl font-bold text-[#073B33]">{getLocalized(service.title)}</h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            {service.featured_image && (
              <img
                src={service.featured_image.url}
                alt={service.featured_image.alt_text || getLocalized(service.title)}
                className="w-full rounded-2xl object-cover"
              />
            )}

            <p className="text-sm leading-relaxed text-[#101828]/70">
              {getLocalized(service.short_description)}
            </p>

            <div
              className="prose max-w-none text-sm leading-7 text-[#101828]/80 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-1"
              dangerouslySetInnerHTML={{ __html: service.content }}
            />

            {deliverables.length > 0 && (
              <div>
                <h2 className="mb-3 text-lg font-semibold text-[#101828]">Deliverables</h2>
                <ul className="space-y-2">
                  {deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#101828]/70">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#073B33]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {requiredDocs.length > 0 && (
              <div>
                <h2 className="mb-3 text-lg font-semibold text-[#101828]">Required Documents</h2>
                <ul className="space-y-2">
                  {requiredDocs.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#101828]/70">
                      <FileText className="mt-0.5 h-4 w-4 shrink-0 text-[#E91E63]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {processSteps.length > 0 && (
              <div>
                <h2 className="mb-3 text-lg font-semibold text-[#101828]">Process Steps</h2>
                <ol className="space-y-3">
                  {processSteps.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#101828]/70">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#073B33] text-xs font-bold text-white">
                        {i + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {faqItems.length > 0 && (
              <div>
                <h2 className="mb-3 text-lg font-semibold text-[#101828]">Frequently Asked Questions</h2>
                <div className="space-y-2">
                  {faqItems.map((item, i) => (
                    <div key={i} className="overflow-hidden rounded-xl border border-border">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-[#101828] hover:bg-primary-light transition-colors"
                      >
                        <span>{item.question}</span>
                        <span className="text-[#E91E63]">{openFaq === i ? '−' : '+'}</span>
                      </button>
                      {openFaq === i && (
                        <div className="border-t border-border px-4 py-3 text-sm leading-relaxed text-[#101828]/70">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-2xl border border-border bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold text-[#101828]">Request This Service</h2>
              <a
                href={whatsappRequestUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#073B33] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#052e28]"
              >
                <Send className="h-4 w-4" />
                Request via WhatsApp
              </a>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-2xl border border-border bg-white p-5">
                <h3 className="mb-4 text-sm font-semibold text-[#101828]">Service Information</h3>
                <div className="space-y-3 text-sm">
                  {service.price !== null && service.price !== undefined && (
                    <div className="flex items-center justify-between">
                      <span className="text-[#101828]/60">Price</span>
                      <span className="font-semibold text-[#073B33]">
                        {service.price} {service.price_currency || 'USD'}
                      </span>
                    </div>
                  )}
                  {deliverables.length > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-[#101828]/60">Deliverables</span>
                      <span className="font-medium text-[#101828]">{deliverables.length} items</span>
                    </div>
                  )}
                  {requiredDocs.length > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-[#101828]/60">Documents</span>
                      <span className="font-medium text-[#101828]">{requiredDocs.length} documents</span>
                    </div>
                  )}
                </div>
              </div>

              <Link
                href={whatsappChatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#20bd5a]"
              >
                <MessageCircle className="h-4 w-4" />
                Contact us on WhatsApp
              </Link>

              <Link
                href="/services"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-medium text-[#101828] transition-colors hover:bg-primary-light"
              >
                <ArrowLeft className="h-4 w-4" />
                All Services
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </PublicLayout>
  )
}
