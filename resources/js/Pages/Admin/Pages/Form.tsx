import { Head, Link, useForm } from '@inertiajs/react'
import AdminLayout from '@/Layouts/AdminLayout'
import type { Page } from '@/Types'
import { ArrowLeft } from 'lucide-react'

interface Props {
  page: Page | null
}

const statusOptions = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
]

const inputClass =
  'w-full rounded-xl border border-[#e0e0e0] bg-white px-4 py-2.5 text-sm text-[#101828] placeholder:text-[#101828]/40 focus:border-[#073B33] focus:outline-none focus:ring-1 focus:ring-[#073B33]/20'
const labelClass = 'mb-1.5 block text-sm font-medium text-[#101828]'

function getFieldValue(value: unknown): string {
  if (typeof value === 'object' && value !== null && 'ar' in value) {
    return JSON.stringify(value)
  }
  return String(value ?? '')
}

export default function PageForm({ page }: Props) {
  const isEdit = page !== null

  const { data, setData, post, put, processing, errors } = useForm({
    title: getFieldValue(page?.title ?? ''),
    slug: page?.slug ?? '',
    content: getFieldValue(page?.content ?? ''),
    status: page?.status ?? 'draft',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isEdit) {
      put(`/admin/pages/${page.id}`)
    } else {
      post('/admin/pages')
    }
  }

  return (
    <AdminLayout title={isEdit ? 'Edit Page' : 'Add Page'}>
      <div className="mx-auto max-w-3xl px-4 py-6">
        <div className="mb-6 flex items-center gap-3">
          <Link
            href="/admin/pages"
            className="rounded-lg p-2 text-[#101828]/50 transition-colors hover:bg-[#073B33]/10 hover:text-[#073B33]"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold text-[#101828]">
            {isEdit ? 'Edit Page' : 'Add Page'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="rounded-2xl border border-[#e0e0e0] bg-white p-5">
            <h2 className="mb-4 text-base font-semibold text-[#101828]">Page Content</h2>

            <div className="space-y-4">
              <div>
                <label className={labelClass}>Title (JSON)</label>
                <textarea
                  value={data.title}
                  onChange={(e) => setData('title', e.target.value)}
                  rows={2}
                  placeholder='{"en": "Page title"}'
                  className={inputClass}
                />
                {errors.title && <p className="mt-1 text-xs text-[#E91E63]">{errors.title}</p>}
              </div>

              <div>
                <label className={labelClass}>Slug</label>
                <input
                  type="text"
                  value={data.slug}
                  onChange={(e) => setData('slug', e.target.value)}
                  className={inputClass}
                />
                {errors.slug && <p className="mt-1 text-xs text-[#E91E63]">{errors.slug}</p>}
              </div>

              <div>
                <label className={labelClass}>Content (JSON - HTML)</label>
                <textarea
                  value={data.content}
                  onChange={(e) => setData('content', e.target.value)}
                  rows={10}
                  placeholder='{"en": "<p>Page content...</p>"}'
                  className={inputClass}
                />
                {errors.content && <p className="mt-1 text-xs text-[#E91E63]">{errors.content}</p>}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#e0e0e0] bg-white p-5">
            <h2 className="mb-4 text-base font-semibold text-[#101828]">Publishing</h2>

            <div>
              <label className={labelClass}>Status</label>
              <select
                value={data.status}
                onChange={(e) => setData('status', e.target.value as Page['status'])}
                className={inputClass}
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.status && <p className="mt-1 text-xs text-[#E91E63]">{errors.status}</p>}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={processing}
              className="rounded-xl bg-[#073B33] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#052a25] disabled:opacity-50"
            >
              {isEdit ? 'Update' : 'Save'}
            </button>
            <Link
              href="/admin/pages"
              className="rounded-xl border border-[#e0e0e0] px-6 py-2.5 text-sm font-medium text-[#101828] transition-colors hover:bg-[#f0f0f0]"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
