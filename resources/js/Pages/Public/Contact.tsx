import { Link, useForm, usePage } from '@inertiajs/react'
import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
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
} from 'lucide-react'
import { FaFacebookF, FaInstagram, FaTelegram, FaYoutube, FaWhatsapp, FaXTwitter } from 'react-icons/fa6'
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
    title: 'التأشيرات',
    description:
      'احصل على مساعدة في فهم متطلبات التأشيرة وتنظيم مستنداتك وإعداد الطلبات لدول حول العالم.',
    href: '/services/visa-application-assistance',
    icon: Plane,
  },
  {
    title: 'وظائف في دول الخليج',
    description:
      'نساعدك في إعداد سيرتك الذاتية، وإيجاد الفرص المناسبة، وتقديم طلبات للوظائف التي تناسب مهاراتك.',
    href: '/services/gulf-job-application-assistance',
    icon: BriefcaseBusiness,
  },
  {
    title: 'طلبات المنح الدراسية',
    description:
      'استكشف فرص المنح الدراسية واحصل على الدعم في مراجعة المتطلبات وإعداد المستندات وتقديم طلبك.',
    href: '/services/scholarship-application-assistance',
    icon: GraduationCap,
  },
  {
    title: 'الرسائل والدعم البحثي',
    description:
      'احصل على دعم موثوق في الرسائل الرسمية، والتخطيط البحثي، والمراجعة اللغوية، وتنسيق المراجع.',
    href: '/services/academic-research-support',
    icon: NotebookPen,
  },
  {
    title: 'ترجمة المستندات',
    description:
      'نساعدك في ترجمة المستندات الأكاديمية والشخصية والمهنية من وإلى اللغات المتاحة.',
    href: '/services/document-translation',
    icon: Languages,
  },
  {
    title: 'خدمات الشهادات',
    description:
      'احصل على مساعدة في تنظيم وترجمة وتصديق وتوثيق الشهادات الصادرة رسميًا من المدارس والجامعات.',
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
  const whatsappChannelUrl = siteSettings.whatsapp_channel_url || socialLinks.whatsapp
  const facebookUrl = siteSettings.facebook_url || socialLinks.facebook
  const instagramUrl = siteSettings.instagram_url || socialLinks.instagram
  const telegramUrl = siteSettings.telegram_url || socialLinks.telegram
  const youtubeUrl = siteSettings.youtube_url || socialLinks.youtube
  const xUrl = siteSettings.x_url || socialLinks.x

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
              أعلن معنا
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">أعلن معنا الآن</h1>
            <p className="mt-4 max-w-2xl leading-7 text-white/80">
              إذا كنت تبحث عن موظفين متميزين أو لديك فرص عمل شاغرة، فنحن هنا لدعمك.
              نربط المؤسسات بالشباب الطموح الباحث عن فرص العمل والتعليم.
              دعنا نساعدك في الوصول إلى الجمهور المناسب وتحقيق أهدافك.
            </p>
            <a
              href="#contact-form"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#E91E63] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#d81b60]"
            >
              اتصل بنا
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </a>
          </div>
        </section>

        <section className="py-14">
          <div className="mb-8 max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#E91E63]">
              نساعد الشباب على السفر
            </p>
            <h2 className="text-3xl font-bold text-[#073B33]">ماذا يمكننا أن نقدمه لك؟</h2>
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
                    اعرف المزيد
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </span>
                </Link>
              )
            })}
          </div>
        </section>

        <div id="contact-form" className="grid scroll-mt-24 gap-12 border-t border-border pt-14 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h1 className="mb-2 text-3xl font-bold text-[#073B33]">اتصل بنا</h1>
            <p className="mb-8 text-sm text-[#101828]/60">
              هل ترغب في الإعلان معنا أو استكشاف فرص جديدة؟ املأ النموذج وسنتواصل معك في أقرب وقت ممكن.
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
                    placeholder="+1 234 567 8900"
                    dir="ltr"
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                </div>
              </div>

              <div className="relative">
                <label htmlFor="country" className="mb-1.5 block text-sm font-medium text-[#101828]">
                  الدولة <span className="text-[#E91E63]">*</span>
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
                  placeholder="ابحث عن دولتك"
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
                  href={whatsappChatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#20bd5a]"
                >
                  <MessageCircle className="h-4 w-4" />
                  الدردشة عبر واتساب
                </a>
              </div>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-border bg-white p-6 space-y-6">
              <h3 className="text-lg font-bold text-[#073B33]">معلومات الاتصال</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#073B33]/10">
                    <Mail className="h-5 w-5 text-[#073B33]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#101828]">البريد الإلكتروني</p>
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
                    <p className="text-sm font-medium text-[#101828]">رقم الهاتف</p>
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
                    <p className="text-sm font-medium text-[#101828]">العنوان</p>
                    <p className="text-sm text-[#101828]/60">{contactAddress}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-5">
                <h4 className="mb-3 text-sm font-semibold text-[#101828]">تابعنا</h4>
                <div className="flex items-center gap-3">
                  <a
                    href={xUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-[#101828]/60 transition-colors hover:border-[#073B33] hover:text-[#073B33]"
                    aria-label="إكس"
                  >
                    <FaXTwitter className="h-5 w-5" />
                  </a>
                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-[#101828]/60 transition-colors hover:border-[#1877F2] hover:text-[#1877F2]"
                    aria-label="فيسبوك"
                  >
                    <FaFacebookF className="h-4 w-4" />
                  </a>
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-[#101828]/60 transition-colors hover:border-[#E4405F] hover:text-[#E4405F]"
                    aria-label="إنستغرام"
                  >
                    <FaInstagram className="h-5 w-5" />
                  </a>
                  <a
                    href={telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-[#101828]/60 transition-colors hover:border-[#26A5E4] hover:text-[#26A5E4]"
                    aria-label="تيليجرام"
                  >
                    <FaTelegram className="h-5 w-5" />
                  </a>
                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-[#101828]/60 transition-colors hover:border-[#FF0000] hover:text-[#FF0000]"
                    aria-label="يوتيوب"
                  >
                    <FaYoutube className="h-5 w-5" />
                  </a>
                  <a
                    href={whatsappChannelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-[#101828]/60 transition-colors hover:border-[#25D366] hover:text-[#25D366]"
                    aria-label="قناة واتساب"
                  >
                    <FaWhatsapp className="h-5 w-5" />
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
