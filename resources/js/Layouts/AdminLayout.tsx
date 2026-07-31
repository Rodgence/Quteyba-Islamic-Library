import { type PropsWithChildren, useState } from 'react'
import { Link, usePage, router } from '@inertiajs/react'
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  GraduationCap,
  Package,
  Users,
  Tags,
  Globe,
  Layers,
  Image,
  Link2,
  Mail,
} from 'lucide-react'
import type { SharedProps } from '@/Types'
import { Head } from '@inertiajs/react'

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  activePattern?: string
  permission?: string
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Opportunities', href: '/admin/opportunities', icon: Briefcase, activePattern: 'opportunities' },
  { label: 'Types', href: '/admin/types', icon: Layers, activePattern: 'types', permission: 'view opportunities' },
  { label: 'Categories', href: '/admin/categories', icon: Tags, activePattern: 'categories', permission: 'view categories' },
  { label: 'Countries', href: '/admin/countries', icon: Globe, activePattern: 'countries', permission: 'view countries' },
  { label: 'Pages', href: '/admin/pages', icon: FileText, activePattern: 'pages' },
  { label: 'Services', href: '/admin/services', icon: Package, activePattern: 'services' },
  { label: 'Courses', href: '/admin/courses', icon: GraduationCap, activePattern: 'courses' },
  { label: 'Media', href: '/admin/media', icon: Image, activePattern: 'media', permission: 'view media' },
  { label: 'Redirects', href: '/admin/redirects', icon: Link2, activePattern: 'redirects', permission: 'view redirects' },
  { label: 'Messages', href: '/admin/messages', icon: MessageSquare, activePattern: 'messages' },
  { label: 'Subscribers', href: '/admin/subscribers', icon: Mail, activePattern: 'subscribers', permission: 'view subscribers' },
  { label: 'Users', href: '/admin/users', icon: Users, activePattern: 'users', permission: 'view users' },
  { label: 'Settings', href: '/admin/settings', icon: Settings, activePattern: 'settings' },
]

export default function AdminLayout({ children, title }: PropsWithChildren<{ title?: string }>) {
  const { auth } = usePage<SharedProps>().props
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''

  const visibleNavItems = navItems.filter(
    (item) => !item.permission || auth.user?.permissions.includes(item.permission)
  )

  const isActive = (item: NavItem) => {
    if (item.href === '/admin') return currentPath === '/admin'
    if (item.activePattern) return currentPath.includes(`/admin/${item.activePattern}`)
    return currentPath.startsWith(item.href)
  }

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault()
    router.post('/logout')
  }

  return (
    <div dir="ltr" lang="en" className="flex h-screen overflow-hidden bg-[#f5f5f5]">
      <Head title={title || 'Dashboard'} />

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-[#e0e0e0] bg-[#073B33] text-white transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
          <Link href="/admin" className="text-lg font-bold">
            Quteyba
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-1.5 text-white/70 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {visibleNavItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive(item)
                      ? 'bg-white/15 text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-[#e0e0e0] bg-white px-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-[#101828] hover:bg-[#f0f0f0] lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3">
            <span className="text-sm text-[#101828]/60">
              {auth.user?.name}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-[#101828]/60 transition-colors hover:bg-[#f0f0f0] hover:text-[#E91E63]"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
