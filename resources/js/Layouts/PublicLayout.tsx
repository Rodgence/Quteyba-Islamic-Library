import { type PropsWithChildren } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { Menu, X, Search, MessageCircle, Camera, Video, Users, Send, Headphones, Radio } from 'lucide-react'
import { useState } from 'react'
import type { SharedProps } from '@/Types'
import { socialLinks } from '@/lib/socialLinks'

export default function PublicLayout({ children }: PropsWithChildren) {
  const { locale } = usePage<SharedProps>().props
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [whatsappMenuOpen, setWhatsappMenuOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Opportunities', href: '/opportunities' },
    { label: 'Services', href: '/services' },
    { label: 'Courses', href: '/courses' },
    { label: 'Certificates', href: '/certificates' },
    { label: 'About', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#101828]" dir="ltr" lang="en">
      <header className="sticky top-0 z-50 border-b border-border bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="/" aria-label="Abu Quteyba International Islamic Library">
            <img
              src="/logo.png"
              alt="Abu Quteyba International Islamic Library"
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
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </Link>
            <button
              className="rounded-lg border border-border p-2 lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
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
              href={socialLinks.whatsappChat}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setWhatsappMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-[#101828] transition-colors hover:bg-gray-50"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366]/10 text-[#128C3E]">
                <Headphones className="h-5 w-5" />
              </span>
              Chat on WhatsApp
            </a>
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setWhatsappMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-[#101828] transition-colors hover:bg-gray-50"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366]/10 text-[#128C3E]">
                <Radio className="h-5 w-5" />
              </span>
              Join WhatsApp channel
            </a>
          </div>
        )}
        <button
          type="button"
          aria-label={whatsappMenuOpen ? 'Close WhatsApp options' : 'Open WhatsApp options'}
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
              <Link href="/" aria-label="Abu Quteyba International Islamic Library">
                <img
                  src="/logo.png"
                  alt="Abu Quteyba International Islamic Library"
                  className="mb-4 h-14 w-auto object-contain"
                />
              </Link>
              <p className="text-sm leading-relaxed opacity-80">
                Your trusted platform for discovering the latest study, work, and travel opportunities around the world.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold">Quick Links</h4>
              <div className="flex flex-col gap-2 text-sm opacity-80">
                <Link href="/opportunities" className="hover:underline">Opportunities</Link>
                <Link href="/services" className="hover:underline">Services</Link>
                <Link href="/courses" className="hover:underline">Courses</Link>
                <Link href="/about" className="hover:underline">About</Link>
              </div>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold">Important Pages</h4>
              <div className="flex flex-col gap-2 text-sm opacity-80">
                <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
                <Link href="/terms-and-conditions" className="hover:underline">Terms & Conditions</Link>
                <Link href="/certificates" className="hover:underline">Certificates</Link>
                <Link href="/advertise" className="hover:underline">Advertise</Link>
              </div>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold">Contact Us</h4>
              <div className="flex flex-wrap gap-2">
                <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Channel" className="rounded-lg bg-white/10 p-2 transition-colors hover:bg-white/20">
                  <MessageCircle className="h-4 w-4" />
                </a>
                <a href={socialLinks.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="rounded-lg bg-white/10 p-2 transition-colors hover:bg-white/20">
                  <Send className="h-4 w-4" />
                </a>
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rounded-lg bg-white/10 p-2 transition-colors hover:bg-white/20">
                  <Camera className="h-4 w-4" />
                </a>
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="rounded-lg bg-white/10 p-2 transition-colors hover:bg-white/20">
                  <Video className="h-4 w-4" />
                </a>
                <a href={socialLinks.x} target="_blank" rel="noopener noreferrer" aria-label="X" className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-sm font-bold transition-colors hover:bg-white/20">
                  X
                </a>
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="rounded-lg bg-white/10 p-2 transition-colors hover:bg-white/20">
                  <Users className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs opacity-60">
            All rights reserved &copy; {new Date().getFullYear()} Quteyba Islamic Library
          </div>
        </div>
      </footer>
    </div>
  )
}
