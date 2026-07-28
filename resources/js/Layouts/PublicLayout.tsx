import { type PropsWithChildren } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { Menu, X, Search, ChevronDown, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import type { SharedProps } from '@/Types'

export default function PublicLayout({ children }: PropsWithChildren) {
  const { locale } = usePage<SharedProps>().props
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { label: 'الرئيسية', href: '/' },
    { label: 'الفرص', href: '/opportunities' },
    { label: 'الخدمات', href: '/services' },
    { label: 'الدورات', href: '/courses' },
    { label: 'عن المنصة', href: '/about' },
    { label: 'اتصل بنا', href: '/contact' },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#101828]" dir="rtl" lang="ar">
      <header className="sticky top-0 z-50 border-b border-border bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="/" className="text-xl font-bold text-primary">
            قتيبة
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

      <footer className="border-t border-border bg-[#073B33] text-white">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-bold">قتيبة</h3>
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
                <Link href="/about" className="hover:underline">عن المنصة</Link>
              </div>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold">صفحات هامة</h4>
              <div className="flex flex-col gap-2 text-sm opacity-80">
                <Link href="/privacy-policy" className="hover:underline">سياسة الخصوصية</Link>
                <Link href="/terms-and-conditions" className="hover:underline">الشروط والأحكام</Link>
                <Link href="/certificates" className="hover:underline">الشهادات</Link>
                <Link href="/advertise" className="hover:underline">الإعلان</Link>
              </div>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold">تواصل معنا</h4>
              <Link
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#20bd5a]"
              >
                <MessageCircle className="h-4 w-4" />
                واتساب
              </Link>
            </div>
          </div>
          <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs opacity-60">
            جميع الحقوق محفوظة &copy; {new Date().getFullYear()} مكتبة قتيبة الإسلامية
          </div>
        </div>
      </footer>
    </div>
  )
}
