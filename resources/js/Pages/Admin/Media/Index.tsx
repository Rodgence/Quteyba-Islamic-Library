import { FileText, Trash2 } from 'lucide-react'
import { router } from '@inertiajs/react'
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

const handleDelete = (id: number) => {
  if (!confirm('Are you sure you want to delete this file?')) return
  router.delete(`/admin/media/${id}`)
}

export default function MediaIndex({ media }: Props) {
  const items = media.data || media

  return (
    <AdminLayout>
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#073B33]">Media Library</h1>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.isArray(items) && items.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-sm">
              <button
                onClick={() => handleDelete(item.id)}
                title="Delete"
                className="absolute right-2 top-2 z-10 rounded-lg bg-white/90 p-1.5 text-gray-400 opacity-0 shadow transition-opacity hover:text-red-500 group-hover:opacity-100"
              >
                <Trash2 className="h-4 w-4" />
              </button>
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
                  <span dir="ltr">{new Date(item.created_at).toLocaleDateString('en-US')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {(!Array.isArray(items) || items.length === 0) && (
          <div className="rounded-xl border border-gray-200 bg-white py-12 text-center text-gray-400">
            No media added yet
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
