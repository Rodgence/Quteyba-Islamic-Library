import { FileText } from 'lucide-react'
import AdminLayout from '@/Layouts/AdminLayout'

interface Medium {
  id: number
  name: string
  file_name: string
  mime_type: string
  size: number
  url: string
  created_at: string
}

interface Props {
  media: { data: Medium[] }
}

const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const isImage = (mime: string) => mime.startsWith('image/')

export default function MediaIndex({ media }: Props) {
  const items = media.data || media

  return (
    <AdminLayout>
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#073B33]">المكتبة الإعلامية</h1>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.isArray(items) && items.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-sm">
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                {isImage(item.mime_type) ? (
                  <img
                    src={item.url}
                    alt={item.file_name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <FileText className="h-12 w-12" />
                    <span className="text-xs">{item.mime_type}</span>
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-medium text-gray-900" title={item.file_name}>
                  {item.file_name}
                </p>
                <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                  <span>{formatBytes(item.size)}</span>
                  <span dir="ltr">{new Date(item.created_at).toLocaleDateString('ar-SA')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {(!Array.isArray(items) || items.length === 0) && (
          <div className="rounded-xl border border-gray-200 bg-white py-12 text-center text-gray-400">
            لا توجد وسائط مضافة بعد
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
