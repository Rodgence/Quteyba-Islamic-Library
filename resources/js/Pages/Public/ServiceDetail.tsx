import { Link, usePage, router } from '@inertiajs/react'
import { useState } from 'react'
import { ArrowLeft, Check, FileText, MessageCircle } from 'lucide-react'
import PublicLayout from '@/Layouts/PublicLayout'
import type { SharedProps } from '@/Types'

interface ServiceItem {
  title: string
  slug: string
  short_description: string
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

function parseAr(value: string): string {
  try {
    const parsed = JSON.parse(value)
    return parsed?.ar || ''
  } catch {
    return value || ''
  }
}

function parseJsonArray(value: string | null): string[] {
  if (!value) return []
  try {
    const parsed = JSON.parse(value)
    if (Array.isArray(parsed)) {
      return parsed.map((item: string | { ar?: string }) =>
        typeof item === 'string' ? item : (item?.ar || '')
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
          question: q?.ar || item.question || '',
          answer: a?.ar || item.answer || '',
        }
      })
    }
    return []
  } catch {
    return []
  }
}

export default function ServiceDetailPage({ service }: Props) {
  const { locale } = usePage<SharedProps>().props
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const deliverables = parseJsonArray(service.deliverables)
  const requiredDocs = parseJsonArray(service.required_documents)
  const processSteps = parseJsonArray(service.process_steps)
  const faqItems = parseFaq(service.faq)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    router.post('/service-request', form, {
      onSuccess: () => {
        setSubmitted(true)
        setForm({ name: '', email: '', phone: '', message: '' })
      },
    })
  }

  return (
    <PublicLayout>
      <div className="bg-primary-light py-8">
        <div className="mx-auto max-w-7xl px-4">
          <nav className="mb-4 flex items-center gap-2 text-sm text-[#101828]/60">
            <Link href="/" className="hover:text-[#073B33]">الرئيسية</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-[#073B33]">الخدمات</Link>
            <span>/</span>
            <span className="text-[#101828]">{parseAr(service.title)}</span>
          </nav>
          <h1 className="text-2xl font-bold text-[#073B33]">{parseAr(service.title)}</h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            {service.featured_image && (
              <img
                src={service.featured_image.url}
                alt={service.featured_image.alt_text || parseAr(service.title)}
                className="w-full rounded-2xl object-cover"
              />
            )}

            <p className="text-sm leading-relaxed text-[#101828]/70">
              {parseAr(service.short_description)}
            </p>

            <div className="prose max-w-none text-sm leading-relaxed text-[#101828]/80">
              <div dangerouslySetInnerHTML={{ __html: parseAr(service.content) }} />
            </div>

            {deliverables.length > 0 && (
              <div>
                <h2 className="mb-3 text-lg font-semibold text-[#101828]">المخرجات</h2>
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
                <h2 className="mb-3 text-lg font-semibold text-[#101828]">المستندات المطلوبة</h2>
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
                <h2 className="mb-3 text-lg font-semibold text-[#101828]">خطوات العملية</h2>
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
                <h2 className="mb-3 text-lg font-semibold text-[#101828]">الأسئلة الشائعة</h2>
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
              <h2 className="mb-4 text-lg font-semibold text-[#101828]">إرسال طلب خدمة</h2>
              {submitted ? (
                <p className="text-sm font-medium text-[#073B33]">تم إرسال طلبك بنجاح. سنتواصل معك قريباً.</p>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="الاسم"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      className="w-full rounded-xl border border-border px-4 py-2.5 text-sm focus:border-[#073B33] focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="البريد الإلكتروني"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      className="w-full rounded-xl border border-border px-4 py-2.5 text-sm focus:border-[#073B33] focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="رقم الهاتف"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full rounded-xl border border-border px-4 py-2.5 text-sm focus:border-[#073B33] focus:outline-none"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="الرسالة"
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full rounded-xl border border-border px-4 py-2.5 text-sm focus:border-[#073B33] focus:outline-none resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-[#073B33] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#052e28]"
                  >
                    إرسال الطلب
                  </button>
                </form>
              )}
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-2xl border border-border bg-white p-5">
                <h3 className="mb-4 text-sm font-semibold text-[#101828]">معلومات الخدمة</h3>
                <div className="space-y-3 text-sm">
                  {service.price !== null && service.price !== undefined && (
                    <div className="flex items-center justify-between">
                      <span className="text-[#101828]/60">السعر</span>
                      <span className="font-semibold text-[#073B33]">
                        {service.price} {service.price_currency || 'دولار'}
                      </span>
                    </div>
                  )}
                  {deliverables.length > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-[#101828]/60">المخرجات</span>
                      <span className="font-medium text-[#101828]">{deliverables.length} عناصر</span>
                    </div>
                  )}
                  {requiredDocs.length > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-[#101828]/60">المستندات</span>
                      <span className="font-medium text-[#101828]">{requiredDocs.length} مستندات</span>
                    </div>
                  )}
                </div>
              </div>

              <Link
                href={service.whatsapp_url || 'https://wa.me/255714241700'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#20bd5a]"
              >
                <MessageCircle className="h-4 w-4" />
                تواصل عبر واتساب
              </Link>

              <Link
                href="/services"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-medium text-[#101828] transition-colors hover:bg-primary-light"
              >
                <ArrowLeft className="h-4 w-4" />
                جميع الخدمات
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </PublicLayout>
  )
}
