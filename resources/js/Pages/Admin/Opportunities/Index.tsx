import { useState } from 'react'
import { Head, Link, router } from '@inertiajs/react'
import AdminLayout from '@/Layouts/AdminLayout'
import type { Paginated, Opportunity } from '@/Types'
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Star,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react'

interface Filters {
  search: string
  status: string
}

interface Props {
  opportunities: Paginated<Opportunity>
  filters: Filters
}

const statusMap: Record<string, { label: string; className: string }> = {
  published: { label: 'منشورة', className: 'bg-emerald-50 text-emerald-600' },
  draft: { label: 'مسودة', className: 'bg-amber-50 text-amber-600' },
  closed: { label: 'مغلقة', className: 'bg-red-50 text-red-600' },
  archived: { label: 'مؤرشفة', className: 'bg-gray-50 text-gray-500' },
  scheduled: { label: 'مجدولة', className: 'bg-blue-50 text-blue-600' },
}

function getLocalized(value: unknown): string {
  if (typeof value === 'object' && value !== null && 'ar' in value) {
    return String((value as Record<string, string>).ar)
  }
  return String(value ?? '')
}

function formatDate(date: string | null): string {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function OpportunitiesIndex({ opportunities, filters }: Props) {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const [bulkStatus, setBulkStatus] = useState('')

  const toggleSelectAll = () => {
    if (selectedIds.size === opportunities.data.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(opportunities.data.map((o) => o.id)))
    }
  }

  const toggleSelect = (id: number) => {
    const next = new Set(selectedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedIds(next)
  }

  const handleSearch = (value: string) => {
    router.get(
      '/admin/opportunities',
      { search: value || undefined, status: filters.status || undefined },
      { preserveState: true, replace: true },
    )
  }

  const handleStatusFilter = (value: string) => {
    router.get(
      '/admin/opportunities',
      { search: filters.search || undefined, status: value || undefined },
      { preserveState: true, replace: true },
    )
  }

  const handleDelete = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذه الفرصة؟')) {
      router.delete(`/admin/opportunities/${id}`)
    }
  }

  const handleBulkDelete = () => {
    if (selectedIds.size === 0) return
    if (confirm(`هل أنت متأكد من حذف ${selectedIds.size} فرصة؟`)) {
      router.post('/admin/opportunities/bulk-delete', { ids: Array.from(selectedIds) })
    }
  }

  const handleBulkStatus = () => {
    if (selectedIds.size === 0 || !bulkStatus) return
    router.post('/admin/opportunities/bulk-status', {
      ids: Array.from(selectedIds),
      status: bulkStatus,
    })
  }

  return (
    <AdminLayout title="الفرص">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-xl font-bold text-[#101828]">الفرص</h1>
          <Link
            href="/admin/opportunities/create"
            className="inline-flex items-center gap-2 rounded-xl bg-[#073B33] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#052a25]"
          >
            <Plus className="h-4 w-4" />
            إضافة فرصة
          </Link>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#101828]/40" />
            <input
              type="text"
              placeholder="بحث..."
              defaultValue={filters.search}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch((e.target as HTMLInputElement).value)
              }}
              className="w-full rounded-xl border border-[#e0e0e0] bg-white py-2.5 pr-9 pl-4 text-sm text-[#101828] placeholder:text-[#101828]/40 focus:border-[#073B33] focus:outline-none focus:ring-1 focus:ring-[#073B33]/20"
            />
          </div>
          <select
            value={filters.status}
            onChange={(e) => handleStatusFilter(e.target.value)}
            className="rounded-xl border border-[#e0e0e0] bg-white px-3 py-2.5 text-sm text-[#101828] focus:border-[#073B33] focus:outline-none focus:ring-1 focus:ring-[#073B33]/20"
          >
            <option value="">كل الحالات</option>
            {Object.entries(statusMap).map(([value, { label }]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        {selectedIds.size > 0 && (
          <div className="mb-4 flex flex-wrap items-center gap-2 rounded-2xl border border-[#073B33]/20 bg-[#073B33]/5 p-3">
            <span className="text-sm text-[#101828]">
              تم تحديد {selectedIds.size} فرصة
            </span>
            <select
              value={bulkStatus}
              onChange={(e) => setBulkStatus(e.target.value)}
              className="rounded-lg border border-[#e0e0e0] bg-white px-2 py-1.5 text-xs text-[#101828]"
            >
              <option value="">تغيير الحالة...</option>
              {Object.entries(statusMap).map(([value, { label }]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            <button
              onClick={handleBulkStatus}
              disabled={!bulkStatus}
              className="rounded-lg bg-[#073B33] px-3 py-1.5 text-xs font-medium text-white disabled:opacity-40"
            >
              تطبيق
            </button>
            <button
              onClick={handleBulkDelete}
              className="rounded-lg bg-[#E91E63] px-3 py-1.5 text-xs font-medium text-white"
            >
              حذف المحدد
            </button>
          </div>
        )}

        <div className="overflow-x-auto rounded-2xl border border-[#e0e0e0] bg-white">
          {opportunities.data.length === 0 ? (
            <div className="py-16 text-center">
              <Search className="mx-auto mb-3 h-10 w-10 text-[#073B33]/15" />
              <p className="text-sm text-[#101828]/50">لا توجد فرص</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="border-b border-[#e0e0e0] bg-[#f9f9f9]">
                <tr>
                  <th className="px-4 py-3 text-right">
                    <input
                      type="checkbox"
                      checked={selectedIds.size === opportunities.data.length && opportunities.data.length > 0}
                      onChange={toggleSelectAll}
                      className="h-4 w-4 rounded border-[#e0e0e0] text-[#073B33] focus:ring-[#073B33]"
                    />
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-[#101828]">العنوان</th>
                  <th className="px-4 py-3 text-right font-medium text-[#101828]">النوع</th>
                  <th className="px-4 py-3 text-right font-medium text-[#101828]">الدولة</th>
                  <th className="px-4 py-3 text-right font-medium text-[#101828]">الحالة</th>
                  <th className="px-4 py-3 text-center font-medium text-[#101828]">مميزة</th>
                  <th className="px-4 py-3 text-right font-medium text-[#101828]">التاريخ</th>
                  <th className="px-4 py-3 text-right font-medium text-[#101828]">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e0e0e0]">
                {opportunities.data.map((opp) => {
                  const status = statusMap[opp.status] || statusMap.draft
                  const title = getLocalized(opp.title)
                  const typeName = opp.opportunity_type
                    ? getLocalized(opp.opportunity_type.name)
                    : '-'
                  const countryName = opp.country
                    ? getLocalized(opp.country.name)
                    : '-'

                  return (
                    <tr key={opp.id} className="hover:bg-[#f9f9f9]">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(opp.id)}
                          onChange={() => toggleSelect(opp.id)}
                          className="h-4 w-4 rounded border-[#e0e0e0] text-[#073B33] focus:ring-[#073B33]"
                        />
                      </td>
                      <td className="max-w-[200px] truncate px-4 py-3 font-medium text-[#101828]">
                        {title || '-'}
                      </td>
                      <td className="px-4 py-3 text-[#101828]/70">{typeName}</td>
                      <td className="px-4 py-3 text-[#101828]/70">{countryName}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block rounded-lg px-2.5 py-1 text-xs font-medium ${status.className}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {opp.is_featured && (
                          <Star className="mx-auto h-4 w-4 text-[#E91E63] fill-[#E91E63]" />
                        )}
                      </td>
                      <td className="px-4 py-3 text-[#101828]/60 text-xs">
                        {formatDate(opp.created_at)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Link
                            href={`/admin/opportunities/${opp.id}/edit`}
                            className="rounded-lg p-2 text-[#101828]/50 transition-colors hover:bg-[#073B33]/10 hover:text-[#073B33]"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(opp.id)}
                            className="rounded-lg p-2 text-[#101828]/50 transition-colors hover:bg-[#E91E63]/10 hover:text-[#E91E63]"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>

        {opportunities.last_page > 1 && (
          <nav className="mt-6 flex items-center justify-center gap-1">
            {opportunities.links.map((link, index) => {
              if (link.url === null) {
                return (
                  <span
                    key={index}
                    className="inline-flex h-9 min-w-[2.25rem] items-center justify-center rounded-lg px-3 text-sm text-[#101828]/30"
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  />
                )
              }

              return (
                <Link
                  key={index}
                  href={link.url}
                  preserveState
                  className={`inline-flex h-9 min-w-[2.25rem] items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors ${
                    link.active
                      ? 'bg-[#073B33] text-white'
                      : 'text-[#101828] hover:bg-[#073B33]/10'
                  }`}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              )
            })}
          </nav>
        )}
      </div>
    </AdminLayout>
  )
}
