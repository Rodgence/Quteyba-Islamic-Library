import { router } from '@inertiajs/react'
import { Trash2, Pencil } from 'lucide-react'
import AdminLayout from '@/Layouts/AdminLayout'

interface Course {
  id: number
  name: string
  slug: string
  language: string
  level: string
  status: string
  price: number | null
}

interface Props {
  courses: Course[]
}

const getAr = (json: string) => {
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
    case 'closed':
      return <span className="inline-flex rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700">مغلق</span>
    default:
      return <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">{status}</span>
  }
}

const handleDelete = (id: number) => {
  if (!confirm('هل أنت متأكد من حذف هذه الدورة؟')) return
  router.delete(`/admin/courses/${id}`)
}

export default function CoursesIndex({ courses }: Props) {
  return (
    <AdminLayout>
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#073B33]">الدورات</h1>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-right">
                <th className="px-4 py-3 font-medium text-gray-600">الاسم</th>
                <th className="px-4 py-3 font-medium text-gray-600">اللغة</th>
                <th className="px-4 py-3 font-medium text-gray-600">المستوى</th>
                <th className="px-4 py-3 font-medium text-gray-600">السعر</th>
                <th className="px-4 py-3 font-medium text-gray-600">الحالة</th>
                <th className="px-4 py-3 font-medium text-gray-600">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {courses.map((course) => (
                <tr key={course.id} className="transition-colors hover:bg-gray-50/50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {getAr(course.name)}
                  </td>
                  <td className="px-4 py-3 text-gray-500">{course.language}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                      {course.level}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-900">
                    {course.price != null ? `${course.price} $` : '-'}
                  </td>
                  <td className="px-4 py-3">
                    {statusBadge(course.status)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                        title="حذف"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => router.get(`/admin/courses/${course.id}/edit`)}
                        className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-[#073B33]"
                        title="تعديل"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {courses.length === 0 && (
                <tr>
                  <td className="px-4 py-8 text-center text-gray-400" colSpan={6}>
                    لا توجد دورات مضافة بعد
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
