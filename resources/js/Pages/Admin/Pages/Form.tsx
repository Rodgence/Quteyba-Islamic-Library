import { useEffect, useRef, useState } from 'react'
import { Link, useForm } from '@inertiajs/react'
import AdminLayout from '@/Layouts/AdminLayout'
import RichTextEditor from '@/Components/RichTextEditor'
import { ArrowLeft, ImagePlus, X } from 'lucide-react'
import { getLocaleValue } from '@/lib/localization'
import { slugify } from '@/lib/slugify'

interface PageFormData {
  id: number
  title: unknown
  slug: string
  content: unknown
  status: 'draft' | 'published'
  featured_image: {
    url: string
    alt_text: string | null
  } | null
}

interface Props {
  page: PageFormData | null
}

const statusOptions = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
]

const inputClass =
  'w-full rounded-xl border border-[#e0e0e0] bg-white px-4 py-2.5 text-sm text-[#101828] placeholder:text-[#101828]/40 focus:border-[#073B33] focus:outline-none focus:ring-1 focus:ring-[#073B33]/20'
const labelClass = 'mb-1.5 block text-sm font-medium text-[#101828]'

export default function PageForm({ page }: Props) {
  const isEdit = page !== null
  const [previewUrl, setPreviewUrl] = useState<string | null>(page?.featured_image?.url ?? null)
  const slugTouchedRef = useRef(isEdit)

  const { data, setData, post, processing, errors } = useForm({
    _method: isEdit ? 'put' : 'post',
    title: getLocaleValue(page?.title, 'en'),
    title_ar: getLocaleValue(page?.title, 'ar'),
    slug: page?.slug ?? '',
    content: getLocaleValue(page?.content, 'en'),
    content_ar: getLocaleValue(page?.content, 'ar'),
    status: page?.status ?? 'draft',
    featured_image: null as File | null,
    featured_image_alt: page?.featured_image?.alt_text ?? '',
    remove_featured_image: false,
  })

  useEffect(() => {
    if (!data.featured_image) return

    const objectUrl = URL.createObjectURL(data.featured_image)
    setPreviewUrl(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [data.featured_image])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post(isEdit ? `/admin/pages/${page.id}` : '/admin/pages', {
      forceFormData: true,
    })
  }

  const handleRemoveImage = () => {
    setData('featured_image', null)
    setData('remove_featured_image', true)
    setPreviewUrl(null)
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

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
          data-gramm="false"
          data-gramm_editor="false"
          data-enable-grammarly="false"
        >
          <div className="rounded-2xl border border-[#e0e0e0] bg-white p-5">
            <h2 className="mb-4 text-base font-semibold text-[#101828]">Page Content</h2>

            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Title (English)</label>
                  <textarea
                    value={data.title}
                    onChange={(e) => {
                      const nextTitle = e.target.value
                      setData('title', nextTitle)
                      if (!slugTouchedRef.current) {
                        const nextSlug = slugify(nextTitle)
                        if (/[a-z]/.test(nextSlug)) setData('slug', nextSlug)
                      }
                    }}
                    rows={2}
                    placeholder="Page title"
                    className={inputClass}
                  />
                  {errors.title && <p className="mt-1 text-xs text-[#E91E63]">{errors.title}</p>}
                </div>
                <div>
                  <label className={labelClass}>Title (Arabic)</label>
                  <textarea
                    value={data.title_ar}
                    onChange={(e) => setData('title_ar', e.target.value)}
                    rows={2}
                    dir="rtl"
                    placeholder="عنوان الصفحة"
                    className={inputClass}
                  />
                  {errors.title_ar && <p className="mt-1 text-xs text-[#E91E63]">{errors.title_ar}</p>}
                </div>
              </div>

              <div>
                <label className={labelClass}>Slug</label>
                <input
                  type="text"
                  value={data.slug}
                  onChange={(e) => {
                    slugTouchedRef.current = true
                    setData('slug', e.target.value)
                  }}
                  placeholder="auto-generated-from-title"
                  className={inputClass}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Used in the page URL — lowercase letters, numbers, and hyphens only.
                </p>
                {errors.slug && <p className="mt-1 text-xs text-[#E91E63]">{errors.slug}</p>}
              </div>

              <div>
                <label className={labelClass}>Description (English)</label>
                <RichTextEditor
                  value={data.content}
                  onChange={(html) => setData('content', html)}
                  placeholder="Write the page description..."
                />
                {errors.content && <p className="mt-1 text-xs text-[#E91E63]">{errors.content}</p>}
              </div>

              <div>
                <label className={labelClass}>Description (Arabic)</label>
                <RichTextEditor
                  value={data.content_ar}
                  onChange={(html) => setData('content_ar', html)}
                  placeholder="اكتب وصف الصفحة..."
                  dir="rtl"
                />
                {errors.content_ar && <p className="mt-1 text-xs text-[#E91E63]">{errors.content_ar}</p>}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#e0e0e0] bg-white p-5">
            <h2 className="mb-4 text-base font-semibold text-[#101828]">Featured Image</h2>
            <div className="grid gap-5 sm:grid-cols-[240px_1fr]">
              <div className="overflow-hidden rounded-xl border border-dashed border-gray-300 bg-gray-50">
                {previewUrl ? (
                  <img src={previewUrl} alt="Featured image preview" className="aspect-video h-full w-full object-cover" />
                ) : (
                  <div className="flex aspect-video items-center justify-center text-gray-400">
                    <ImagePlus className="h-10 w-10" />
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Upload Image</label>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={(event) => {
                      const file = event.target.files?.[0] ?? null
                      setData('featured_image', file)
                      if (file) setData('remove_featured_image', false)
                    }}
                    className="block w-full rounded-xl border border-[#e0e0e0] bg-white text-sm text-gray-600 file:mr-4 file:border-0 file:bg-[#073B33] file:px-4 file:py-2.5 file:text-sm file:font-medium file:text-white"
                  />
                  <p className="mt-1 text-xs text-gray-500">JPG, PNG, WebP, or GIF. Maximum size: 5 MB.</p>
                  {errors.featured_image && <p className="mt-1 text-xs text-[#E91E63]">{errors.featured_image}</p>}
                </div>
                <div>
                  <label className={labelClass}>Alternative Text</label>
                  <input
                    type="text"
                    value={data.featured_image_alt}
                    onChange={(event) => setData('featured_image_alt', event.target.value)}
                    className={inputClass}
                    placeholder="Describe the image"
                  />
                </div>
                {previewUrl && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600"
                  >
                    <X className="h-4 w-4" />
                    Remove featured image
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#e0e0e0] bg-white p-5">
            <h2 className="mb-4 text-base font-semibold text-[#101828]">Publishing</h2>

            <div>
              <label className={labelClass}>Status</label>
              <select
                value={data.status}
                onChange={(e) => setData('status', e.target.value as 'draft' | 'published')}
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
