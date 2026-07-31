import { useState } from 'react'
import { router } from '@inertiajs/react'
import { Trash2 } from 'lucide-react'
import AdminLayout from '@/Layouts/AdminLayout'

interface CourseRegistrationItem {
  id: number
  name: string
  email: string
  phone: string | null
  status: string
  course: { name: string } | null
  created_at: string
}

interface Props {
  registrations: {
    data: CourseRegistrationItem[]
    current_page: number
    last_page: number
    links: { url: string | null; label: string; active: boolean }[]
  }
  filters: { status?: string }
}

const statusOptions = ['new', 'contacted', 'registered', 'cancelled']

const statusColors: Record<string, string> = {
  new: 'bg-[#E91E63]/10 text-[#E91E63]',
  contacted: 'bg-blue-100 text-blue-700',
  registered: 'bg-green-100 text-green-700',
  cancelled: 'bg-gray-100 text-gray-500',
}

const formatDate = (dateStr: string) =>
  new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(dateStr))

export default function CourseRegistrationsIndex({ registrations, filters }: Props) {
  const [activeFilter, setActiveFilter] = useState(filters.status || 'all')

  const applyFilter = (status: string) => {
    setActiveFilter(status)
    router.get('/admin/course-registrations', status !== 'all' ? { status } : {}, { preserveState: true, replace: true })
  }

  const handleStatusChange = (id: number, status: string) => {
    router.put(`/admin/course-registrations/${id}`, { status }, { preserveState: true })
  }

  const handleDelete = (id: number) => {
    if (!confirm('Are you sure you want to delete this registration?')) return
    router.delete(`/admin/course-registrations/${id}`)
  }

  return (
    <AdminLayout>
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#073B33]">Course Registrations</h1>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {['all', ...statusOptions].map((status) => (
            <button
              key={status}
              onClick={() => applyFilter(status)}
              className={`rounded-xl px-4 py-2 text-sm font-medium capitalize transition-colors ${
                activeFilter === status
                  ? 'bg-[#073B33] text-white'
                  : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left">
                <th className="px-4 py-3 font-medium text-gray-600">Course</th>
                <th className="px-4 py-3 font-medium text-gray-600">Name</th>
                <th className="px-4 py-3 font-medium text-gray-600">Email</th>
                <th className="px-4 py-3 font-medium text-gray-600">Phone</th>
                <th className="px-4 py-3 font-medium text-gray-600">Date</th>
                <th className="px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {registrations.data.map((r) => (
                <tr key={r.id} className="transition-colors hover:bg-gray-50/50">
                  <td className="px-4 py-3 text-gray-700">{r.course?.name || '-'}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{r.name}</td>
                  <td className="px-4 py-3 text-gray-500" dir="ltr">{r.email}</td>
                  <td className="px-4 py-3 text-gray-500" dir="ltr">{r.phone || '-'}</td>
                  <td className="px-4 py-3 text-gray-400" dir="ltr">{formatDate(r.created_at)}</td>
                  <td className="px-4 py-3">
                    <select
                      value={r.status}
                      onChange={(e) => handleStatusChange(r.id, e.target.value)}
                      className={`rounded-full border-0 px-2.5 py-0.5 text-xs font-medium capitalize focus:outline-none focus:ring-1 focus:ring-[#073B33] ${statusColors[r.status] || 'bg-gray-100 text-gray-600'}`}
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {registrations.data.length === 0 && (
                <tr>
                  <td className="px-4 py-8 text-center text-gray-400" colSpan={7}>
                    No course registrations
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {registrations.last_page > 1 && (
          <div className="mt-4 flex items-center justify-center gap-1">
            {registrations.links
              .filter((link) => link.url !== null)
              .map((link, i) => (
                <button
                  key={i}
                  onClick={() => router.get(link.url!, {}, { preserveState: true })}
                  disabled={link.active}
                  className={`rounded-xl px-3 py-1.5 text-sm font-medium transition-colors ${
                    link.active ? 'bg-[#073B33] text-white' : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
