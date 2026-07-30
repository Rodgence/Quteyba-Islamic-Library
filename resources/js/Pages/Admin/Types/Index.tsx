import { useState } from 'react'
import { useForm, router } from '@inertiajs/react'
import { Trash2, Pencil, Plus, X, Check } from 'lucide-react'
import AdminLayout from '@/Layouts/AdminLayout'

interface Type {
  id: number
  name: string
  slug: string
  icon: string | null
  opportunities_count: number
}

interface Props {
  types: Type[]
}

export default function TypesIndex({ types }: Props) {
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  const { data, setData, post, processing, reset, errors } = useForm({
    name: '',
    slug: '',
    icon: '',
  })

  const {
    data: editData,
    setData: setEditData,
    put,
    processing: editProcessing,
    reset: editReset,
  } = useForm({
    name: '',
    slug: '',
    icon: '',
  })

  const handleAdd = () => {
    post('/admin/types', {
      onSuccess: () => {
        reset()
        setAdding(false)
      },
    })
  }

  const startEdit = (type: Type) => {
    setEditingId(type.id)
    setEditData({
      name: type.name,
      slug: type.slug,
      icon: type.icon || '',
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    editReset()
  }

  const handleUpdate = (id: number) => {
    put(`/admin/types/${id}`, {
      onSuccess: () => {
        setEditingId(null)
        editReset()
      },
    })
  }

  const handleDelete = (id: number) => {
    if (!confirm('Are you sure you want to delete this type?')) return
    router.delete(`/admin/types/${id}`)
  }

  return (
    <AdminLayout>
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#073B33]">Opportunity Types</h1>
          {!adding && (
            <button
              onClick={() => setAdding(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#073B33] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#052b26]"
            >
              <Plus className="h-4 w-4" />
              Add Type
            </button>
          )}
        </div>

        {adding && (
          <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4">
            <div className="grid gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
                <textarea
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  placeholder="Type name"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-[#073B33] focus:outline-none"
                  rows={2}
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Slug</label>
                  <input
                    type="text"
                    value={data.slug}
                    onChange={(e) => setData('slug', e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-[#073B33] focus:outline-none"
                  />
                  {errors.slug && <p className="mt-1 text-xs text-red-500">{errors.slug}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Icon</label>
                  <input
                    type="text"
                    value={data.icon}
                    onChange={(e) => setData('icon', e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-[#073B33] focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-2">
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
          </div>
        )}

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left">
                <th className="px-4 py-3 font-medium text-gray-600">Name</th>
                <th className="px-4 py-3 font-medium text-gray-600">Slug</th>
                <th className="px-4 py-3 font-medium text-gray-600">Opportunities</th>
                <th className="px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {types.map((type) => (
                <tr key={type.id} className="transition-colors hover:bg-gray-50/50">
                  {editingId === type.id ? (
                    <>
                      <td className="px-4 py-3" colSpan={4}>
                        <div className="grid gap-3 sm:grid-cols-3">
                          <div>
                            <label className="mb-1 block text-xs font-medium text-gray-500">Name</label>
                            <textarea
                              value={editData.name}
                              onChange={(e) => setEditData('name', e.target.value)}
                              className="w-full rounded-xl border border-gray-200 px-2 py-1.5 text-sm focus:border-[#073B33] focus:outline-none"
                              rows={2}
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-xs font-medium text-gray-500">Slug</label>
                            <input
                              type="text"
                              value={editData.slug}
                              onChange={(e) => setEditData('slug', e.target.value)}
                              className="w-full rounded-xl border border-gray-200 px-2 py-1.5 text-sm focus:border-[#073B33] focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-xs font-medium text-gray-500">Icon</label>
                            <input
                              type="text"
                              value={editData.icon}
                              onChange={(e) => setEditData('icon', e.target.value)}
                              className="w-full rounded-xl border border-gray-200 px-2 py-1.5 text-sm focus:border-[#073B33] focus:outline-none"
                            />
                          </div>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <button
                            onClick={() => handleUpdate(type.id)}
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
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {type.name}
                      </td>
                      <td className="px-4 py-3 text-gray-500">{type.slug}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-full bg-[#073B33]/10 px-2.5 py-0.5 text-xs font-medium text-[#073B33]">
                          {type.opportunities_count}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => startEdit(type)}
                            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-[#073B33]"
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(type.id)}
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
              {types.length === 0 && (
                <tr>
                  <td className="px-4 py-8 text-center text-gray-400" colSpan={4}>
                    No types added yet
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
