import { Head, Link, router } from '@inertiajs/react'
import AdminLayout from '@/Layouts/AdminLayout'
import type { Paginated, Page } from '@/Types'
import { Plus, Edit, Trash2, Search } from 'lucide-react'

interface Props {
  pages: Paginated<Page>
}

const statusMap: Record<string, { label: string; className: string }> = {
  published: { label: 'منشورة', className: 'bg-emerald-50 text-emerald-600' },
  draft: { label: 'مسودة', className: 'bg-amber-50 text-amber-600' },
}

function formatDate(date: string | null): string {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function PagesIndex({ pages }: Props) {
  const handleDelete = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذه الصفحة؟')) {
      router.delete(`/admin/pages/${id}`)
    }
  }

  return (
    <AdminLayout title="الصفحات">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-xl font-bold text-[#101828]">الصفحات</h1>
          <Link
            href="/admin/pages/create"
            className="inline-flex items-center gap-2 rounded-xl bg-[#073B33] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#052a25]"
          >
            <Plus className="h-4 w-4" />
            إضافة صفحة
          </Link>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#e0e0e0] bg-white">
          {pages.data.length === 0 ? (
            <div className="py-16 text-center">
              <Search className="mx-auto mb-3 h-10 w-10 text-[#073B33]/15" />
              <p className="text-sm text-[#101828]/50">لا توجد صفحات</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="border-b border-[#e0e0e0] bg-[#f9f9f9]">
                <tr>
                  <th className="px-4 py-3 text-right font-medium text-[#101828]">العنوان</th>
                  <th className="px-4 py-3 text-right font-medium text-[#101828]">الرابط</th>
                  <th className="px-4 py-3 text-right font-medium text-[#101828]">الحالة</th>
                  <th className="px-4 py-3 text-right font-medium text-[#101828]">التاريخ</th>
                  <th className="px-4 py-3 text-right font-medium text-[#101828]">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e0e0e0]">
                {pages.data.map((page) => {
                  const status = statusMap[page.status] || statusMap.draft
                  return (
                    <tr key={page.id} className="hover:bg-[#f9f9f9]">
                      <td className="max-w-[300px] truncate px-4 py-3 font-medium text-[#101828]">
                        {page.title || '-'}
                      </td>
                      <td className="px-4 py-3 text-[#101828]/60 text-xs dir-ltr text-left font-mono">
                        /{page.slug}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block rounded-lg px-2.5 py-1 text-xs font-medium ${status.className}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#101828]/60 text-xs">
                        {formatDate(page.created_at)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Link
                            href={`/admin/pages/${page.id}/edit`}
                            className="rounded-lg p-2 text-[#101828]/50 transition-colors hover:bg-[#073B33]/10 hover:text-[#073B33]"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(page.id)}
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

        {pages.last_page > 1 && (
          <nav className="mt-6 flex items-center justify-center gap-1">
            {pages.links.map((link, index) => {
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
