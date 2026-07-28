import { useForm, usePage } from '@inertiajs/react'
import { Mail, Phone, MapPin, MessageCircle, Send, ExternalLink } from 'lucide-react'
import PublicLayout from '@/Layouts/PublicLayout'
import type { SharedProps } from '@/Types'

interface ContactProps {
  seo?: Record<string, string>
}

export default function Contact({ seo }: ContactProps) {
  const { flash } = usePage<SharedProps>().props

  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/contact', {
      onSuccess: () => reset(),
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

        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h1 className="mb-2 text-3xl font-bold text-[#073B33]">اتصل بنا</h1>
            <p className="mb-8 text-sm text-[#101828]/60">
              يسعدنا تواصلك معنا. املأ النموذج أدناه وسنقوم بالرد عليك في أقرب وقت ممكن.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[#101828]">
                  الاسم الكامل <span className="text-[#E91E63]">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-[#101828] placeholder:text-[#101828]/40 focus:border-[#073B33] focus:outline-none focus:ring-1 focus:ring-[#073B33]"
                  placeholder="أدخل اسمك الكامل"
                />
                {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#101828]">
                    البريد الإلكتروني <span className="text-[#E91E63]">*</span>
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
                    رقم الهاتف
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={data.phone}
                    onChange={(e) => setData('phone', e.target.value)}
                    className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-[#101828] placeholder:text-[#101828]/40 focus:border-[#073B33] focus:outline-none focus:ring-1 focus:ring-[#073B33]"
                    placeholder="+966 5xxxxxxxx"
                    dir="ltr"
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-[#101828]">
                  الموضوع <span className="text-[#E91E63]">*</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  value={data.subject}
                  onChange={(e) => setData('subject', e.target.value)}
                  className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-[#101828] placeholder:text-[#101828]/40 focus:border-[#073B33] focus:outline-none focus:ring-1 focus:ring-[#073B33]"
                  placeholder="موضوع رسالتك"
                />
                {errors.subject && <p className="mt-1 text-xs text-red-600">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-[#101828]">
                  الرسالة <span className="text-[#E91E63]">*</span>
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={data.message}
                  onChange={(e) => setData('message', e.target.value)}
                  className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-[#101828] placeholder:text-[#101828]/40 focus:border-[#073B33] focus:outline-none focus:ring-1 focus:ring-[#073B33] resize-none"
                  placeholder="اكتب رسالتك هنا..."
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
                  {processing ? 'جارٍ الإرسال...' : 'إرسال الرسالة'}
                </button>

                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#20bd5a]"
                >
                  <MessageCircle className="h-4 w-4" />
                  واتساب
                </a>
              </div>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-border bg-white p-6 space-y-6">
              <h3 className="text-lg font-bold text-[#073B33]">معلومات التواصل</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#073B33]/10">
                    <Mail className="h-5 w-5 text-[#073B33]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#101828]">البريد الإلكتروني</p>
                    <a href="mailto:info@quteyba.com" className="text-sm text-[#073B33] hover:underline" dir="ltr">
                      info@quteyba.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#073B33]/10">
                    <Phone className="h-5 w-5 text-[#073B33]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#101828]">رقم الهاتف</p>
                    <a href="tel:+1234567890" className="text-sm text-[#073B33] hover:underline" dir="ltr">
                      +123 456 7890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#073B33]/10">
                    <MapPin className="h-5 w-5 text-[#073B33]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#101828]">العنوان</p>
                    <p className="text-sm text-[#101828]/60">المملكة العربية السعودية</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-5">
                <h4 className="mb-3 text-sm font-semibold text-[#101828]">تابعنا على</h4>
                <div className="flex items-center gap-3">
                  <a
                    href="https://twitter.com/quteyba"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-[#101828]/60 transition-colors hover:border-[#073B33] hover:text-[#073B33]"
                    aria-label="تويتر"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href="https://facebook.com/quteyba"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-[#101828]/60 transition-colors hover:border-[#073B33] hover:text-[#073B33]"
                    aria-label="فيسبوك"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com/quteyba"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-[#101828]/60 transition-colors hover:border-[#073B33] hover:text-[#073B33]"
                    aria-label="انستغرام"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
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
