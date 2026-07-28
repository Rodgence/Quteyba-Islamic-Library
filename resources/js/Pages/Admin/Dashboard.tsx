import { Head, Link } from '@inertiajs/react'
import AdminLayout from '@/Layouts/AdminLayout'
import {
  Briefcase,
  CheckCircle,
  FileText,
  MessageSquare,
  HelpCircle,
  ArrowLeft,
  Plus,
  Eye,
  Edit,
  Clock,
} from 'lucide-react'

interface DashboardStats {
  opportunities: number
  published: number
  draft: number
  messages: number
  requests: number
}

interface DashboardProps {
  stats: DashboardStats
}

const statCards = [
  { key: 'opportunities' as const, label: 'إجمالي الفرص', icon: Briefcase },
  { key: 'published' as const, label: 'منشورة', icon: CheckCircle },
  { key: 'draft' as const, label: 'مسودات', icon: FileText },
  { key: 'messages' as const, label: 'رسائل غير مقروءة', icon: MessageSquare },
  { key: 'requests' as const, label: 'طلبات جديدة', icon: HelpCircle },
]

const quickLinks = [
  { label: 'إضافة فرصة جديدة', href: '/admin/opportunities/create', icon: Plus },
  { label: 'عرض جميع الفرص', href: '/admin/opportunities', icon: Eye },
  { label: 'إضافة صفحة جديدة', href: '/admin/pages/create', icon: FileText },
]

export default function Dashboard({ stats }: DashboardProps) {
  return (
    <AdminLayout title="لوحة التحكم">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <h1 className="mb-6 text-xl font-bold text-[#101828]">لوحة التحكم</h1>

        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {statCards.map((card) => {
            const Icon = card.icon
            return (
              <div
                key={card.key}
                className="rounded-2xl border border-[#e0e0e0] bg-white p-4 transition-shadow hover:shadow-sm"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm text-[#101828]/60">{card.label}</span>
                  <Icon className="h-5 w-5 text-[#073B33]" />
                </div>
                <div className="text-2xl font-bold text-[#073B33]">
                  {(stats[card.key] ?? 0).toLocaleString('ar-EG')}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-[#101828]">روابط سريعة</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 rounded-2xl border border-[#e0e0e0] bg-white p-4 text-sm font-medium text-[#101828] transition-colors hover:border-[#073B33]/30 hover:bg-[#073B33]/5"
              >
                <link.icon className="h-5 w-5 text-[#E91E63]" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold text-[#101828]">آخر النشاطات</h2>
          <div className="rounded-2xl border border-[#e0e0e0] bg-white p-8 text-center">
            <Clock className="mx-auto mb-3 h-10 w-10 text-[#073B33]/15" />
            <p className="text-sm text-[#101828]/50">قيد التطوير</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
