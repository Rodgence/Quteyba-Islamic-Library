import { useState } from 'react'
import { useForm, router } from '@inertiajs/react'
import { Pencil, Plus, X, Check } from 'lucide-react'
import AdminLayout from '@/Layouts/AdminLayout'

interface Category {
  id: number
  name: string
  slug: string
  opportunities_count: number
}

interface Props {
  categories: Category[]
}

export default function CategoriesIndex({ categories }: Props) {
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  const { data, setData, post, processing, reset, errors } = useForm({
    name: '',
    slug: '',
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
  })

  const handleAdd = () => {
    post('/admin/categories', {
      onSuccess: () => {
        reset()
        setAdding(false)
      },
    })
  }

  const startEdit = (category: Category) => {
    setEditingId(category.id)
    setEditData({
      name: typeof category.name === 'string' ? category.name : JSON.stringify(category.name),
      slug: category.slug,
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    editReset()
  }

  const handleUpdate = (id: number) => {
    put(`/admin/categories/${id}`, {
      onSuccess: () => {
        setEditingId(null)
        editReset()
      },
    })
  }

  return (
    <AdminLayout>
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#073B33]">التصنيفات</h1>
          {!adding && (
            <button
              onClick={() => setAdding(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#073B33] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#052b26]"
            >
              <Plus className="h-4 w-4" />
              إضافة تصنيف
            </button>
          )}
        </div>

        {adding && (
          <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4">
            <div className="grid gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">الاسم (JSON)</label>
                <textarea
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  placeholder='{"ar":"اسم التصنيف"}'
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-[#073B33] focus:outline-none"
                  rows={2}
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">الرابط المختصر</label>
                <input
                  type="text"
                  value={data.slug}
                  onChange={(e) => setData('slug', e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-[#073B33] focus:outline-none"
                />
                {errors.slug && <p className="mt-1 text-xs text-red-500">{errors.slug}</p>}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleAdd}
                  disabled={processing}
                  className="inline-flex items-center gap-1 rounded-xl bg-[#073B33] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#052b26] disabled:opacity-50"
                >
                  <Check className="h-4 w-4" />
                  حفظ
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
              <tr className="border-b border-gray-100 bg-gray-50 text-right">
                <th className="px-4 py-3 font-medium text-gray-600">الاسم</th>
                <th className="px-4 py-3 font-medium text-gray-600">الرابط المختصر</th>
                <th className="px-4 py-3 font-medium text-gray-600">عدد الفرص</th>
                <th className="px-4 py-3 font-medium text-gray-600">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories.map((category) => (
                <tr key={category.id} className="transition-colors hover:bg-gray-50/50">
                  {editingId === category.id ? (
                    <>
                      <td className="px-4 py-3" colSpan={4}>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <label className="mb-1 block text-xs font-medium text-gray-500">الاسم (JSON)</label>
                            <textarea
                              value={editData.name}
                              onChange={(e) => setEditData('name', e.target.value)}
                              className="w-full rounded-xl border border-gray-200 px-2 py-1.5 text-sm focus:border-[#073B33] focus:outline-none"
                              rows={2}
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-xs font-medium text-gray-500">الرابط المختصر</label>
                            <input
                              type="text"
                              value={editData.slug}
                              onChange={(e) => setEditData('slug', e.target.value)}
                              className="w-full rounded-xl border border-gray-200 px-2 py-1.5 text-sm focus:border-[#073B33] focus:outline-none"
                            />
                          </div>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <button
                            onClick={() => handleUpdate(category.id)}
                            disabled={editProcessing}
                            className="inline-flex items-center gap-1 rounded-xl bg-[#073B33] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#052b26] disabled:opacity-50"
                          >
                            <Check className="h-3 w-3" />
                            حفظ
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="inline-flex items-center gap-1 rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
                          >
                            <X className="h-3 w-3" />
                            إلغاء
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {typeof category.name === 'string' ? category.name : category.name}
                      </td>
                      <td className="px-4 py-3 text-gray-500">{category.slug}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-full bg-[#073B33]/10 px-2.5 py-0.5 text-xs font-medium text-[#073B33]">
                          {category.opportunities_count}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => startEdit(category)}
                          className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-[#073B33]"
                          title="تعديل"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td className="px-4 py-8 text-center text-gray-400" colSpan={4}>
                    لا توجد تصنيفات مضافة بعد
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
