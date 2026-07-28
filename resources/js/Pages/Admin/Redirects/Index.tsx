import { router } from '@inertiajs/react'
import { Trash2, Pencil, ExternalLink } from 'lucide-react'
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

const handleDelete = (id: number) => {
  if (!confirm('هل أنت متأكد من حذف هذا التحويل؟')) return
  router.delete(`/admin/redirects/${id}`)
}

export default function RedirectsIndex({ redirects }: Props) {
  const items = (redirects as any).data || redirects

  return (
    <AdminLayout>
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#073B33]">التحويلات</h1>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-right">
                <th className="px-4 py-3 font-medium text-gray-600">من</th>
                <th className="px-4 py-3 font-medium text-gray-600">إلى</th>
                <th className="px-4 py-3 font-medium text-gray-600">كود الحالة</th>
                <th className="px-4 py-3 font-medium text-gray-600">نشط</th>
                <th className="px-4 py-3 font-medium text-gray-600">عدد الزيارات</th>
                <th className="px-4 py-3 font-medium text-gray-600">التاريخ</th>
                <th className="px-4 py-3 font-medium text-gray-600">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {Array.isArray(items) && items.map((redirect: Redirect) => (
                <tr key={redirect.id} className="transition-colors hover:bg-gray-50/50">
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
                      {redirect.is_active ? 'نشط' : 'غير نشط'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-900">{redirect.hit_count}</td>
                  <td className="px-4 py-3 text-gray-500" dir="ltr">
                    {new Date(redirect.created_at).toLocaleDateString('ar-SA')}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDelete(redirect.id)}
                        className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                        title="حذف"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => router.get(`/admin/redirects/${redirect.id}/edit`)}
                        className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-[#073B33]"
                        title="تعديل"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {(!Array.isArray(items) || items.length === 0) && (
                <tr>
                  <td className="px-4 py-8 text-center text-gray-400" colSpan={7}>
                    لا توجد تحويلات مضافة بعد
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
