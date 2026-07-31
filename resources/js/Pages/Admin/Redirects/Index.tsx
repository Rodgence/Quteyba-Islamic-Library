import { useState } from 'react'
import { useForm, router } from '@inertiajs/react'
import { Trash2, Pencil, Plus, X, Check } from 'lucide-react'
import AdminLayout from '@/Layouts/AdminLayout'

interface Redirect {
  id: number
  from_url: string
  to_url: string
  status_code: number
  is_active: boolean
  hit_count: number
  created_at: string
}

interface Props {
  redirects: { data: Redirect[] }
}

export default function RedirectsIndex({ redirects }: Props) {
  const items = (redirects as any).data || redirects
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  const { data, setData, post, processing, reset, errors } = useForm({
    from_url: '',
    to_url: '',
    status_code: '301',
    is_active: true as boolean,
  })

  const {
    data: editData,
    setData: setEditData,
    put,
    processing: editProcessing,
    reset: editReset,
  } = useForm({
    from_url: '',
    to_url: '',
    status_code: '301',
    is_active: true as boolean,
  })

  const handleAdd = () => {
    post('/admin/redirects', {
      onSuccess: () => {
        reset()
        setAdding(false)
      },
    })
  }

  const startEdit = (redirect: Redirect) => {
    setEditingId(redirect.id)
    setEditData({
      from_url: redirect.from_url,
      to_url: redirect.to_url,
      status_code: String(redirect.status_code),
      is_active: redirect.is_active,
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    editReset()
  }

  const handleUpdate = (id: number) => {
    put(`/admin/redirects/${id}`, {
      onSuccess: () => {
        setEditingId(null)
        editReset()
      },
    })
  }

  const handleDelete = (id: number) => {
    if (!confirm('Are you sure you want to delete this redirect?')) return
    router.delete(`/admin/redirects/${id}`)
  }

  return (
    <AdminLayout>
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#073B33]">Redirects</h1>
          {!adding && (
            <button
              onClick={() => setAdding(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#073B33] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#052b26]"
            >
              <Plus className="h-4 w-4" />
              Add Redirect
            </button>
          )}
        </div>

        {adding && (
          <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">From URL</label>
                <input
                  type="text"
                  value={data.from_url}
                  onChange={(e) => setData('from_url', e.target.value)}
                  placeholder="/old-path"
                  dir="ltr"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-[#073B33] focus:outline-none"
                />
                {errors.from_url && <p className="mt-1 text-xs text-red-500">{errors.from_url}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">To URL</label>
                <input
                  type="text"
                  value={data.to_url}
                  onChange={(e) => setData('to_url', e.target.value)}
                  placeholder="/new-path"
                  dir="ltr"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-[#073B33] focus:outline-none"
                />
                {errors.to_url && <p className="mt-1 text-xs text-red-500">{errors.to_url}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Status Code</label>
                <select
                  value={data.status_code}
                  onChange={(e) => setData('status_code', e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-[#073B33] focus:outline-none"
                >
                  <option value="301">301 (Permanent)</option>
                  <option value="302">302 (Temporary)</option>
                </select>
              </div>
              <div className="flex items-end gap-2 pb-2">
                <input
                  type="checkbox"
                  id="new-redirect-active"
                  checked={data.is_active}
                  onChange={(e) => setData('is_active', e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-[#073B33] focus:ring-[#073B33]"
                />
                <label htmlFor="new-redirect-active" className="text-sm font-medium text-gray-700">Active</label>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={handleAdd}
                disabled={processing}
                className="inline-flex items-center gap-1 rounded-xl bg-[#073B33] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#052b26] disabled:opacity-50"
              >
                <Check className="h-4 w-4" />
                Save
              </button>
              <button
                onClick={() => {
                  setAdding(false)
                  reset()
                }}
                className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left">
                <th className="px-4 py-3 font-medium text-gray-600">From</th>
                <th className="px-4 py-3 font-medium text-gray-600">To</th>
                <th className="px-4 py-3 font-medium text-gray-600">Status Code</th>
                <th className="px-4 py-3 font-medium text-gray-600">Active</th>
                <th className="px-4 py-3 font-medium text-gray-600">Hits</th>
                <th className="px-4 py-3 font-medium text-gray-600">Date</th>
                <th className="px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {Array.isArray(items) && items.map((redirect: Redirect) => (
                <tr key={redirect.id} className="transition-colors hover:bg-gray-50/50">
                  {editingId === redirect.id ? (
                    <td className="px-4 py-3" colSpan={7}>
                      <div className="grid gap-3 sm:grid-cols-4">
                        <div>
                          <label className="mb-1 block text-xs font-medium text-gray-500">From URL</label>
                          <input
                            type="text"
                            value={editData.from_url}
                            onChange={(e) => setEditData('from_url', e.target.value)}
                            dir="ltr"
                            className="w-full rounded-xl border border-gray-200 px-2 py-1.5 text-sm focus:border-[#073B33] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-medium text-gray-500">To URL</label>
                          <input
                            type="text"
                            value={editData.to_url}
                            onChange={(e) => setEditData('to_url', e.target.value)}
                            dir="ltr"
                            className="w-full rounded-xl border border-gray-200 px-2 py-1.5 text-sm focus:border-[#073B33] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-medium text-gray-500">Status Code</label>
                          <select
                            value={editData.status_code}
                            onChange={(e) => setEditData('status_code', e.target.value)}
                            className="w-full rounded-xl border border-gray-200 px-2 py-1.5 text-sm focus:border-[#073B33] focus:outline-none"
                          >
                            <option value="301">301</option>
                            <option value="302">302</option>
                          </select>
                        </div>
                        <div className="flex items-end gap-2 pb-1.5">
                          <input
                            type="checkbox"
                            id={`edit-redirect-active-${redirect.id}`}
                            checked={editData.is_active}
                            onChange={(e) => setEditData('is_active', e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-[#073B33] focus:ring-[#073B33]"
                          />
                          <label htmlFor={`edit-redirect-active-${redirect.id}`} className="text-xs font-medium text-gray-500">Active</label>
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => handleUpdate(redirect.id)}
                          disabled={editProcessing}
                          className="inline-flex items-center gap-1 rounded-xl bg-[#073B33] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#052b26] disabled:opacity-50"
                        >
                          <Check className="h-3 w-3" />
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="inline-flex items-center gap-1 rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
                        >
                          <X className="h-3 w-3" />
                          Cancel
                        </button>
                      </div>
                    </td>
                  ) : (
                    <>
                      <td className="px-4 py-3 font-medium text-gray-900" dir="ltr">
                        {redirect.from_url}
                      </td>
                      <td className="px-4 py-3 text-gray-500" dir="ltr">
                        {redirect.to_url}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex rounded-full bg-[#073B33]/10 px-2.5 py-0.5 text-xs font-medium text-[#073B33]">
                          {redirect.status_code}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          redirect.is_active
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          {redirect.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-900">{redirect.hit_count}</td>
                      <td className="px-4 py-3 text-gray-500" dir="ltr">
                        {new Date(redirect.created_at).toLocaleDateString('en-US')}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => startEdit(redirect)}
                            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-[#073B33]"
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(redirect.id)}
                            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {(!Array.isArray(items) || items.length === 0) && (
                <tr>
                  <td className="px-4 py-8 text-center text-gray-400" colSpan={7}>
                    No redirects added yet
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
