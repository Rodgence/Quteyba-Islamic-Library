import { Link, router } from '@inertiajs/react'
import { ImageIcon, Pencil, Plus, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'
import AdminLayout from '@/Layouts/AdminLayout'

interface Service {
  id: number
  title: string
  slug: string
  icon: string | null
  status: string
  is_active: boolean | number
  display_order: number | null
  service_requests_count: number
  featured_image: {
    url: string
    alt_text: string | null
  } | null
}

interface Props {
  services: Service[]
}

const statusBadge = (status: string) => {
  if (status === 'published') {
    return (
      <span className="inline-flex rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
        Published
      </span>
    )
  }

  return (
    <span className="inline-flex rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-700">
      Draft
    </span>
  )
}

export default function ServicesIndex({ services }: Props) {
  const handleDelete = (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return
    router.delete(`/admin/services/${id}`)
  }

  const handleActiveToggle = (service: Service) => {
    router.put(
      `/admin/services/${service.id}`,
      { is_active: !Boolean(service.is_active) },
      { preserveScroll: true },
    )
  }

  return (
    <AdminLayout title="Services">
      <div className="mx-auto max-w-6xl p-4 lg:p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#073B33]">Services</h1>
            <p className="mt-1 text-sm text-gray-500">Manage public services and their featured images.</p>
          </div>
          <Link
            href="/admin/services/create"
            className="inline-flex items-center gap-2 rounded-xl bg-[#073B33] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#052b26]"
          >
            <Plus className="h-4 w-4" />
            Add Service
          </Link>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="w-full min-w-[800px] text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left">
                <th className="px-4 py-3 font-medium text-gray-600">Image</th>
                <th className="px-4 py-3 font-medium text-gray-600">Title</th>
                <th className="px-4 py-3 font-medium text-gray-600">Slug</th>
                <th className="px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 font-medium text-gray-600">Active</th>
                <th className="px-4 py-3 font-medium text-gray-600">Order</th>
                <th className="px-4 py-3 font-medium text-gray-600">Requests</th>
                <th className="px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {services.map((service) => (
                <tr key={service.id} className="transition-colors hover:bg-gray-50/50">
                  <td className="px-4 py-3">
                    {service.featured_image ? (
                      <img
                        src={service.featured_image.url}
                        alt={service.featured_image.alt_text || service.title}
                        className="h-12 w-16 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-16 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                        <ImageIcon className="h-5 w-5" />
                      </div>
                    )}
                  </td>
                  <td className="max-w-[240px] px-4 py-3 font-medium text-gray-900">
                    <p className="truncate">{service.title}</p>
                    {service.icon && <p className="mt-0.5 text-xs font-normal text-gray-400">{service.icon}</p>}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{service.slug}</td>
                  <td className="px-4 py-3">{statusBadge(service.status)}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => handleActiveToggle(service)}
                      className="rounded-lg p-1 transition-colors hover:bg-gray-100"
                      title={service.is_active ? 'Active' : 'Inactive'}
                    >
                      {service.is_active ? (
                        <ToggleRight className="h-6 w-6 text-green-600" />
                      ) : (
                        <ToggleLeft className="h-6 w-6 text-gray-300" />
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{service.display_order ?? '-'}</td>
                  <td className="px-4 py-3 text-gray-500">{service.service_requests_count}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/admin/services/${service.id}/edit`}
                        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-[#073B33]"
                        title="Edit service"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(service.id)}
                        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                        title="Delete service"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr>
                  <td className="px-4 py-12 text-center text-gray-400" colSpan={8}>
                    No services found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
