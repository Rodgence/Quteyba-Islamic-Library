import { router } from '@inertiajs/react'
import { Trash2 } from 'lucide-react'
import AdminLayout from '@/Layouts/AdminLayout'

interface Subscriber {
  id: number
  email: string
  is_active: boolean
  subscribed_at: string
  created_at: string
}

interface Props {
  subscribers: { data: Subscriber[] }
}

const handleDelete = (id: number) => {
  if (!confirm('Are you sure you want to delete this subscriber?')) return
  router.delete(`/admin/subscribers/${id}`)
}

export default function SubscribersIndex({ subscribers }: Props) {
  const items = (subscribers as any).data || subscribers

  return (
    <AdminLayout>
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#073B33]">Subscribers</h1>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left">
                <th className="px-4 py-3 font-medium text-gray-600">Email</th>
                <th className="px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 font-medium text-gray-600">Subscribed On</th>
                <th className="px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {Array.isArray(items) && items.map((subscriber: Subscriber) => (
                <tr key={subscriber.id} className="transition-colors hover:bg-gray-50/50">
                  <td className="px-4 py-3 font-medium text-gray-900" dir="ltr">
                    {subscriber.email}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      subscriber.is_active
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {subscriber.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500" dir="ltr">
                    {subscriber.subscribed_at
                      ? new Date(subscriber.subscribed_at).toLocaleDateString('en-US')
                      : '-'}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(subscriber.id)}
                      className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {(!Array.isArray(items) || items.length === 0) && (
                <tr>
                  <td className="px-4 py-8 text-center text-gray-400" colSpan={4}>
                    No subscribers yet
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
