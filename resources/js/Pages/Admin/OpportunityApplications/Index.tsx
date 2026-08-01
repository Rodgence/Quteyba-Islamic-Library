import { Fragment, useState } from 'react'
import { router, Link } from '@inertiajs/react'
import { Trash2, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import AdminLayout from '@/Layouts/AdminLayout'

interface ApplicationItem {
  id: number
  name: string
  email: string
  phone: string | null
  message: string | null
  status: string
  opportunity: { title: string; slug: string } | null
  created_at: string
}

interface Props {
  applications: {
    data: ApplicationItem[]
    current_page: number
    last_page: number
    links: { url: string | null; label: string; active: boolean }[]
  }
  filters: { status?: string }
}

const statusOptions = ['new', 'contacted', 'submitted', 'cancelled']

const statusColors: Record<string, string> = {
  new: 'bg-[#E91E63]/10 text-[#E91E63]',
  contacted: 'bg-blue-100 text-blue-700',
  submitted: 'bg-green-100 text-green-700',
  cancelled: 'bg-gray-100 text-gray-500',
}

const formatDate = (dateStr: string) =>
  new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(dateStr))

export default function OpportunityApplicationsIndex({ applications, filters }: Props) {
  const [activeFilter, setActiveFilter] = useState(filters.status || 'all')
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const applyFilter = (status: string) => {
    setActiveFilter(status)
    router.get('/admin/opportunity-applications', status !== 'all' ? { status } : {}, { preserveState: true, replace: true })
  }

  const handleStatusChange = (id: number, status: string) => {
    router.put(`/admin/opportunity-applications/${id}`, { status }, { preserveState: true })
  }

  const handleDelete = (id: number) => {
    if (!confirm('Are you sure you want to delete this application?')) return
    router.delete(`/admin/opportunity-applications/${id}`)
  }

  return (
    <AdminLayout>
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#073B33]">Applications</h1>
          <p className="mt-1 text-sm text-gray-500">
            Submissions from "Apply Now Through Our Team" on opportunity pages.
          </p>
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
                <th className="px-4 py-3 font-medium text-gray-600">Opportunity</th>
                <th className="px-4 py-3 font-medium text-gray-600">Name</th>
                <th className="px-4 py-3 font-medium text-gray-600">Email</th>
                <th className="px-4 py-3 font-medium text-gray-600">Phone</th>
                <th className="px-4 py-3 font-medium text-gray-600">Date</th>
                <th className="px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {applications.data.map((a) => (
                <Fragment key={a.id}>
                  <tr className="transition-colors hover:bg-gray-50/50">
                    <td className="px-4 py-3 text-gray-700">
                      {a.opportunity ? (
                        <Link
                          href={`/opportunities/${a.opportunity.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 hover:text-[#073B33] hover:underline"
                        >
                          {a.opportunity.title}
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      ) : '-'}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">{a.name}</td>
                    <td className="px-4 py-3 text-gray-500" dir="ltr">{a.email}</td>
                    <td className="px-4 py-3 text-gray-500" dir="ltr">{a.phone || '-'}</td>
                    <td className="px-4 py-3 text-gray-400" dir="ltr">{formatDate(a.created_at)}</td>
                    <td className="px-4 py-3">
                      <select
                        value={a.status}
                        onChange={(e) => handleStatusChange(a.id, e.target.value)}
                        className={`rounded-full border-0 px-2.5 py-0.5 text-xs font-medium capitalize focus:outline-none focus:ring-1 focus:ring-[#073B33] ${statusColors[a.status] || 'bg-gray-100 text-gray-600'}`}
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {a.message && (
                          <button
                            onClick={() => setExpandedId(expandedId === a.id ? null : a.id)}
                            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-[#073B33]"
                            title="Toggle message"
                          >
                            {expandedId === a.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(a.id)}
                          className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedId === a.id && a.message && (
                    <tr className="bg-gray-50/50">
                      <td colSpan={7} className="px-4 py-3 text-sm leading-relaxed text-gray-600">
                        {a.message}
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
              {applications.data.length === 0 && (
                <tr>
                  <td className="px-4 py-8 text-center text-gray-400" colSpan={7}>
                    No applications yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {applications.last_page > 1 && (
          <div className="mt-4 flex items-center justify-center gap-1">
            {applications.links
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
