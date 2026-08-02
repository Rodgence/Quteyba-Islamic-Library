import { type PropsWithChildren } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { Menu, X, Search, MessageCircle, Headphones, Radio } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaTelegram, FaYoutube, FaWhatsapp, FaXTwitter } from 'react-icons/fa6'
import { useState } from 'react'
import type { SharedProps } from '@/Types'
import { socialLinks } from '@/lib/socialLinks'

export default function PublicLayout({ children }: PropsWithChildren) {
  const { locale, siteSettings } = usePage<SharedProps>().props
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [whatsappMenuOpen, setWhatsappMenuOpen] = useState(false)
  const whatsappChatUrl = siteSettings.whatsapp_number
    ? `https://wa.me/${siteSettings.whatsapp_number}`
    : socialLinks.whatsappChat
  const whatsappChannelUrl = siteSettings.whatsapp_channel_url || socialLinks.whatsapp
  const facebookUrl = siteSettings.facebook_url || socialLinks.facebook
  const instagramUrl = siteSettings.instagram_url || socialLinks.instagram
  const telegramUrl = siteSettings.telegram_url || socialLinks.telegram
  const youtubeUrl = siteSettings.youtube_url || socialLinks.youtube
  const xUrl = siteSettings.x_url || socialLinks.x

  const navItems = [
    { label: 'الرئيسية', href: '/' },
    { label: 'الفرص', href: '/opportunities' },
    { label: 'الخدمات', href: '/services' },
    { label: 'الدورات', href: '/courses' },
    { label: 'الشهادات', href: '/certificates' },
    { label: 'من نحن', href: '/about' },
    { label: 'اتصل بنا', href: '/contact' },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#101828]" dir="rtl" lang="ar">
      <header className="sticky top-0 z-50 border-b border-border bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="/" aria-label="مكتبة أبي قتيبة الإسلامية العالمية">
            <img
              src="/logo.png"
              alt="مكتبة أبي قتيبة الإسلامية العالمية"
              className="h-12 w-auto object-contain"
            />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-black transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/search"
              className="rounded-lg border border-border p-2 text-black hover:text-primary"
              aria-label="بحث"
            >
              <Search className="h-4 w-4" />
            </Link>
            <button
              className="rounded-lg border border-border p-2 lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-border bg-white px-4 py-4 lg:hidden">
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-black transition-colors hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
        {whatsappMenuOpen && (
          <div
            id="whatsapp-actions"
            className="w-56 overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 shadow-xl"
          >
            <a
              href={whatsappChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setWhatsappMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-[#101828] transition-colors hover:bg-gray-50"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366]/10 text-[#128C3E]">
                <Headphones className="h-5 w-5" />
              </span>
              الدردشة عبر واتساب
            </a>
            <a
              href={whatsappChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setWhatsappMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-[#101828] transition-colors hover:bg-gray-50"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366]/10 text-[#128C3E]">
                <Radio className="h-5 w-5" />
              </span>
              انضم إلى قناة واتساب
            </a>
          </div>
        )}
        <button
          type="button"
          aria-label={whatsappMenuOpen ? 'إغلاق خيارات واتساب' : 'فتح خيارات واتساب'}
          aria-expanded={whatsappMenuOpen}
          aria-controls="whatsapp-actions"
          onClick={() => setWhatsappMenuOpen((open) => !open)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
        >
          {whatsappMenuOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-7 w-7" />}
        </button>
      </div>

      <footer className="border-t border-border bg-[#073B33] text-white">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link href="/" aria-label="مكتبة أبي قتيبة الإسلامية العالمية">
                <img
                  src="/logo.png"
                  alt="مكتبة أبي قتيبة الإسلامية العالمية"
                  className="mb-4 h-14 w-auto object-contain"
                />
              </Link>
              <p className="text-sm leading-relaxed opacity-80">
                منصتك الموثوقة لاكتشاف أحدث فرص الدراسة والعمل والسفر حول العالم.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold">روابط سريعة</h4>
              <div className="flex flex-col gap-2 text-sm opacity-80">
                <Link href="/opportunities" className="hover:underline">الفرص</Link>
                <Link href="/services" className="hover:underline">الخدمات</Link>
                <Link href="/courses" className="hover:underline">الدورات</Link>
                <Link href="/about" className="hover:underline">من نحن</Link>
              </div>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold">صفحات مهمة</h4>
              <div className="flex flex-col gap-2 text-sm opacity-80">
                <Link href="/privacy-policy" className="hover:underline">سياسة الخصوصية</Link>
                <Link href="/terms-and-conditions" className="hover:underline">الشروط والأحكام</Link>
                <Link href="/certificates" className="hover:underline">الشهادات</Link>
                <Link href="/advertise" className="hover:underline">أعلن معنا</Link>
              </div>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold">اتصل بنا</h4>
              <div className="flex flex-wrap gap-2">
                <a href={whatsappChannelUrl} target="_blank" rel="noopener noreferrer" aria-label="قناة واتساب" className="rounded-lg bg-white/10 p-2 transition-colors hover:bg-[#25D366]">
                  <FaWhatsapp className="h-4 w-4" />
                </a>
                <a href={telegramUrl} target="_blank" rel="noopener noreferrer" aria-label="تيليجرام" className="rounded-lg bg-white/10 p-2 transition-colors hover:bg-[#26A5E4]">
                  <FaTelegram className="h-4 w-4" />
                </a>
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="إنستغرام" className="rounded-lg bg-white/10 p-2 transition-colors hover:bg-[#E4405F]">
                  <FaInstagram className="h-4 w-4" />
                </a>
                <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="يوتيوب" className="rounded-lg bg-white/10 p-2 transition-colors hover:bg-[#FF0000]">
                  <FaYoutube className="h-4 w-4" />
                </a>
                <a href={xUrl} target="_blank" rel="noopener noreferrer" aria-label="إكس" className="rounded-lg bg-white/10 p-2 transition-colors hover:bg-white/20">
                  <FaXTwitter className="h-4 w-4" />
                </a>
                <a href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="فيسبوك" className="rounded-lg bg-white/10 p-2 transition-colors hover:bg-[#1877F2]">
                  <FaFacebookF className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs opacity-60">
            جميع الحقوق محفوظة © {new Date().getFullYear()} مكتبة قتيبة الإسلامية
          </div>
        </div>
      </footer>
    </div>
  )
}
