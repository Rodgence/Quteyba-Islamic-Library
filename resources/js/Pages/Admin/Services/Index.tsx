import { useState } from 'react'
import { useForm, router } from '@inertiajs/react'
import { Pencil, Plus, X, Check, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'
import AdminLayout from '@/Layouts/AdminLayout'

interface Service {
  id: number
  title: string
  slug: string
  short_description: string | null
  content: string | null
  icon: string | null
  whatsapp_url: string | null
  status: string
  is_active: boolean | number
  display_order: number | null
  service_requests_count: number
}

interface Props {
  services: Service[]
}

const getAr = (json: string | null): string => {
  if (!json) return '-'
  try {
    const parsed = JSON.parse(json)
    return parsed.ar || json
  } catch {
    return json
  }
}

const statusBadge = (status: string) => {
  switch (status) {
    case 'published':
      return <span className="inline-flex rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">منشور</span>
    case 'draft':
      return <span className="inline-flex rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-700">مسودة</span>
    default:
      return <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">{status}</span>
  }
}

export default function ServicesIndex({ services }: Props) {
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  const { data, setData, post, processing, reset, errors } = useForm({
    title: '{"ar":""}',
    slug: '',
    short_description: '',
    content: '',
    icon: '',
    whatsapp_url: '',
    status: 'draft',
    is_active: true as boolean,
    display_order: '',
  })

  const {
    data: editData,
    setData: setEditData,
    put,
    processing: editProcessing,
    reset: editReset,
    errors: editErrors,
  } = useForm({
    title: '',
    slug: '',
    short_description: '',
    content: '',
    icon: '',
    whatsapp_url: '',
    status: 'draft',
    is_active: true as boolean,
    display_order: '',
  })

  const handleAdd = () => {
    post('/admin/services', {
      onSuccess: () => {
        reset()
        setAdding(false)
      },
    })
  }

  const startEdit = (service: Service) => {
    setEditingId(service.id)
    setEditData({
      title: typeof service.title === 'string' ? service.title : JSON.stringify(service.title),
      slug: service.slug,
      short_description: typeof service.short_description === 'string' ? service.short_description : (service.short_description ? JSON.stringify(service.short_description) : ''),
      content: typeof service.content === 'string' ? service.content : (service.content ? JSON.stringify(service.content) : ''),
      icon: service.icon || '',
      whatsapp_url: service.whatsapp_url || '',
      status: service.status,
      is_active: Boolean(service.is_active),
      display_order: service.display_order?.toString() || '',
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    editReset()
  }

  const handleUpdate = (id: number) => {
    put(`/admin/services/${id}`, {
      onSuccess: () => {
        setEditingId(null)
        editReset()
      },
    })
  }

  const handleDelete = (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذه الخدمة؟')) return
    router.delete(`/admin/services/${id}`)
  }

  const handleActiveToggle = (service: Service) => {
    router.put(`/admin/services/${service.id}`, {
      is_active: !service.is_active,
    } as Record<string, unknown>, {
      preserveScroll: true,
    })
  }

  const formFields = (
    data: Record<string, unknown>,
    setData: (key: string, value: unknown) => void,
    errors: Record<string, string>,
    compact = false
  ) => {
    const inputClass = compact
      ? 'w-full rounded-lg border border-gray-200 px-2 py-1.5 text-sm focus:border-[#073B33] focus:outline-none'
      : 'w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-[#073B33] focus:outline-none'
    const labelClass = 'mb-1 block text-xs font-medium text-gray-500'

    return (
      <div className={compact ? 'grid gap-2' : 'grid gap-3'}>
        <div className={compact ? 'grid gap-2 sm:grid-cols-2' : 'grid gap-3 sm:grid-cols-2'}>
          <div>
            <label className={labelClass}>العنوان (JSON)</label>
            <textarea
              value={data.title as string}
              onChange={(e) => setData('title', e.target.value)}
              placeholder='{"ar":"اسم الخدمة"}'
              className={inputClass}
              rows={compact ? 2 : 2}
            />
            {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
          </div>
          <div>
            <label className={labelClass}>الرابط المختصر</label>
            <input
              type="text"
              value={data.slug as string}
              onChange={(e) => setData('slug', e.target.value)}
              className={inputClass}
            />
            {errors.slug && <p className="mt-1 text-xs text-red-500">{errors.slug}</p>}
          </div>
        </div>
        <div className={compact ? 'grid gap-2 sm:grid-cols-2' : 'grid gap-3 sm:grid-cols-2'}>
          <div>
            <label className={labelClass}>الوصف المختصر (JSON)</label>
            <textarea
              value={data.short_description as string}
              onChange={(e) => setData('short_description', e.target.value)}
              placeholder='{"ar":"وصف مختصر"}'
              className={inputClass}
              rows={2}
            />
          </div>
          <div>
            <label className={labelClass}>الأيقونة</label>
            <input
              type="text"
              value={data.icon as string}
              onChange={(e) => setData('icon', e.target.value)}
              className={inputClass}
              placeholder="icon-name"
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>المحتوى (JSON)</label>
          <textarea
            value={data.content as string}
            onChange={(e) => setData('content', e.target.value)}
            placeholder='{"ar":"المحتوى..."}'
            className={inputClass}
            rows={compact ? 4 : 6}
          />
        </div>
        <div className={compact ? 'grid gap-2 sm:grid-cols-3' : 'grid gap-3 sm:grid-cols-3'}>
          <div>
            <label className={labelClass}>رابط واتساب</label>
            <input
              type="text"
              value={data.whatsapp_url as string}
              onChange={(e) => setData('whatsapp_url', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>الحالة</label>
            <select
              value={data.status as string}
              onChange={(e) => setData('status', e.target.value)}
              className={inputClass}
            >
              <option value="draft">مسودة</option>
              <option value="published">منشور</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>ترتيب العرض</label>
            <input
              type="number"
              value={data.display_order as string}
              onChange={(e) => setData('display_order', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <AdminLayout>
      <div className="mx-auto max-w-5xl p-4 lg:p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#073B33]">الخدمات</h1>
          {!adding && (
            <button
              onClick={() => setAdding(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#073B33] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#052b26]"
            >
              <Plus className="h-4 w-4" />
              إضافة خدمة
            </button>
          )}
        </div>

        {adding && (
          <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4">
            {formFields(data as unknown as Record<string, unknown>, setData as (key: string, value: unknown) => void, errors)}
            <div className="mt-3 flex gap-2">
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
                className="inline-flex items-center gap-1 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
              >
                <X className="h-4 w-4" />
                إلغاء
              </button>
            </div>
          </div>
        )}

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-right">
                <th className="px-4 py-3 font-medium text-gray-600">العنوان</th>
                <th className="px-4 py-3 font-medium text-gray-600">الرابط المختصر</th>
                <th className="px-4 py-3 font-medium text-gray-600">الأيقونة</th>
                <th className="px-4 py-3 font-medium text-gray-600">الحالة</th>
                <th className="px-4 py-3 font-medium text-gray-600">نشط</th>
                <th className="px-4 py-3 font-medium text-gray-600">الترتيب</th>
                <th className="px-4 py-3 font-medium text-gray-600">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {services.map((service) => (
                <tr key={service.id} className="transition-colors hover:bg-gray-50/50">
                  {editingId === service.id ? (
                    <td className="px-4 py-3" colSpan={7}>
                      {formFields(
                        editData as unknown as Record<string, unknown>,
                        setEditData as (key: string, value: unknown) => void,
                        editErrors as Record<string, string>,
                        true
                      )}
                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => handleUpdate(service.id)}
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
                  ) : (
                    <>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {getAr(service.title)}
                      </td>
                      <td className="px-4 py-3 text-gray-500 dir-ltr text-left font-mono text-xs">
                        {service.slug}
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {service.icon || '-'}
                      </td>
                      <td className="px-4 py-3">
                        {statusBadge(service.status)}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleActiveToggle(service)}
                          className="rounded-lg p-1 transition-colors hover:bg-gray-100"
                          title={service.is_active ? 'نشط' : 'غير نشط'}
                        >
                          {service.is_active ? (
                            <ToggleRight className="h-5 w-5 text-green-600" />
                          ) : (
                            <ToggleLeft className="h-5 w-5 text-gray-300" />
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {service.display_order ?? '-'}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => startEdit(service)}
                            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-[#073B33]"
                            title="تعديل"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(service.id)}
                            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                            title="حذف"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {services.length === 0 && (
                <tr>
                  <td className="px-4 py-12 text-center text-gray-400" colSpan={7}>
                    لا توجد خدمات
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
