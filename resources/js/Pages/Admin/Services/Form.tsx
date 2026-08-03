import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useForm } from '@inertiajs/react'
import { ArrowLeft, ImagePlus, Save, X } from 'lucide-react'
import AdminLayout from '@/Layouts/AdminLayout'
import RichTextEditor from '@/Components/RichTextEditor'
import { getLocaleValue } from '@/lib/localization'
import { slugify } from '@/lib/slugify'

interface ServiceFormData {
  id: number
  title: unknown
  slug: string
  short_description: unknown
  content: unknown
  icon: string | null
  whatsapp_url: string | null
  status: 'draft' | 'published'
  is_active: boolean | number
  display_order: number | null
  featured_image: {
    url: string
    alt_text: string | null
  } | null
}

interface Props {
  service: ServiceFormData | null
}

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#073B33] focus:outline-none focus:ring-1 focus:ring-[#073B33]/20'
const labelClass = 'mb-1.5 block text-sm font-medium text-gray-700'

export default function ServiceForm({ service }: Props) {
  const isEdit = service !== null
  const [previewUrl, setPreviewUrl] = useState<string | null>(service?.featured_image?.url ?? null)
  const slugTouchedRef = useRef(isEdit)

  const { data, setData, post, processing, errors } = useForm({
    _method: isEdit ? 'put' : 'post',
    title: getLocaleValue(service?.title, 'en'),
    title_ar: getLocaleValue(service?.title, 'ar'),
    slug: service?.slug ?? '',
    short_description: getLocaleValue(service?.short_description, 'en'),
    short_description_ar: getLocaleValue(service?.short_description, 'ar'),
    content: getLocaleValue(service?.content, 'en'),
    content_ar: getLocaleValue(service?.content, 'ar'),
    icon: service?.icon ?? '',
    whatsapp_url: service?.whatsapp_url ?? '',
    status: service?.status ?? 'draft',
    is_active: Boolean(service?.is_active ?? true),
    display_order: service?.display_order?.toString() ?? '',
    featured_image: null as File | null,
    featured_image_alt: service?.featured_image?.alt_text ?? '',
    remove_featured_image: false,
  })

  useEffect(() => {
    if (!data.featured_image) return

    const objectUrl = URL.createObjectURL(data.featured_image)
    setPreviewUrl(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [data.featured_image])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    post(isEdit ? `/admin/services/${service.id}` : '/admin/services', {
      forceFormData: true,
    })
  }

  const handleRemoveImage = () => {
    setData('featured_image', null)
    setData('remove_featured_image', true)
    setPreviewUrl(null)
  }

  return (
    <AdminLayout title={isEdit ? 'Edit Service' : 'Add Service'}>
      <div className="mx-auto max-w-4xl p-4 lg:p-6">
        <div className="mb-6 flex items-center gap-3">
          <Link
            href="/admin/services"
            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-[#073B33]/10 hover:text-[#073B33]"
            aria-label="Back to services"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#073B33]">
              {isEdit ? 'Edit Service' : 'Add Service'}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage the service content, publishing settings, and featured image.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <section className="rounded-2xl border border-gray-200 bg-white p-5">
            <h2 className="mb-4 text-base font-semibold text-gray-900">Basic Information</h2>
            <div className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Title (English)</label>
                  <input
                    type="text"
                    value={data.title}
                    onChange={(event) => {
                      const nextTitle = event.target.value
                      setData('title', nextTitle)
                      if (!slugTouchedRef.current) {
                        const nextSlug = slugify(nextTitle)
                        if (/[a-z]/.test(nextSlug)) setData('slug', nextSlug)
                      }
                    }}
                    className={inputClass}
                    placeholder="Service title"
                  />
                  {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
                </div>
                <div>
                  <label className={labelClass}>Title (Arabic)</label>
                  <input
                    type="text"
                    value={data.title_ar}
                    onChange={(event) => setData('title_ar', event.target.value)}
                    className={inputClass}
                    dir="rtl"
                    placeholder="عنوان الخدمة"
                  />
                  {errors.title_ar && <p className="mt-1 text-xs text-red-600">{errors.title_ar}</p>}
                </div>
              </div>

              <div>
                <label className={labelClass}>Slug</label>
                <input
                  type="text"
                  value={data.slug}
                  onChange={(event) => {
                    slugTouchedRef.current = true
                    setData('slug', event.target.value)
                  }}
                  className={inputClass}
                  placeholder="auto-generated-from-title"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Used in the page URL — lowercase letters, numbers, and hyphens only.
                </p>
                {errors.slug && <p className="mt-1 text-xs text-red-600">{errors.slug}</p>}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Short Description (English)</label>
                  <textarea
                    value={data.short_description}
                    onChange={(event) => setData('short_description', event.target.value)}
                    className={inputClass}
                    rows={3}
                    placeholder="A short summary displayed on service cards."
                  />
                  {errors.short_description && (
                    <p className="mt-1 text-xs text-red-600">{errors.short_description}</p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>Short Description (Arabic)</label>
                  <textarea
                    value={data.short_description_ar}
                    onChange={(event) => setData('short_description_ar', event.target.value)}
                    className={inputClass}
                    rows={3}
                    dir="rtl"
                    placeholder="ملخص قصير يظهر في بطاقات الخدمة."
                  />
                  {errors.short_description_ar && (
                    <p className="mt-1 text-xs text-red-600">{errors.short_description_ar}</p>
                  )}
                </div>
              </div>

              <div>
                <label className={labelClass}>Description (English)</label>
                <RichTextEditor
                  value={data.content}
                  onChange={(html) => setData('content', html)}
                  placeholder="Describe the service..."
                />
                {errors.content && <p className="mt-1 text-xs text-red-600">{errors.content}</p>}
              </div>

              <div>
                <label className={labelClass}>Description (Arabic)</label>
                <RichTextEditor
                  value={data.content_ar}
                  onChange={(html) => setData('content_ar', html)}
                  placeholder="صف الخدمة..."
                  dir="rtl"
                />
                {errors.content_ar && <p className="mt-1 text-xs text-red-600">{errors.content_ar}</p>}
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-white p-5">
            <h2 className="mb-4 text-base font-semibold text-gray-900">Featured Image</h2>
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
                    className="block w-full rounded-xl border border-gray-200 bg-white text-sm text-gray-600 file:mr-4 file:border-0 file:bg-[#073B33] file:px-4 file:py-2.5 file:text-sm file:font-medium file:text-white hover:file:bg-[#052b26]"
                  />
                  <p className="mt-1 text-xs text-gray-500">JPG, PNG, WebP, or GIF. Maximum size: 5 MB.</p>
                  {errors.featured_image && (
                    <p className="mt-1 text-xs text-red-600">{errors.featured_image}</p>
                  )}
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
                  {errors.featured_image_alt && (
                    <p className="mt-1 text-xs text-red-600">{errors.featured_image_alt}</p>
                  )}
                </div>
                {previewUrl && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                    Remove featured image
                  </button>
                )}
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-white p-5">
            <h2 className="mb-4 text-base font-semibold text-gray-900">Publishing</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className={labelClass}>Icon</label>
                <input
                  type="text"
                  value={data.icon}
                  onChange={(event) => setData('icon', event.target.value)}
                  className={inputClass}
                  placeholder="graduation-cap"
                />
              </div>
              <div>
                <label className={labelClass}>WhatsApp URL</label>
                <input
                  type="url"
                  value={data.whatsapp_url}
                  onChange={(event) => setData('whatsapp_url', event.target.value)}
                  className={inputClass}
                  placeholder="https://wa.me/..."
                />
                {errors.whatsapp_url && <p className="mt-1 text-xs text-red-600">{errors.whatsapp_url}</p>}
              </div>
              <div>
                <label className={labelClass}>Status</label>
                <select
                  value={data.status}
                  onChange={(event) => setData('status', event.target.value as 'draft' | 'published')}
                  className={inputClass}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Display Order</label>
                <input
                  type="number"
                  min="0"
                  value={data.display_order}
                  onChange={(event) => setData('display_order', event.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
            <label className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={data.is_active}
                onChange={(event) => setData('is_active', event.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-[#073B33] focus:ring-[#073B33]"
              />
              Active and visible in public service listings
            </label>
          </section>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={processing}
              className="inline-flex items-center gap-2 rounded-xl bg-[#073B33] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#052b26] disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {processing ? 'Saving...' : isEdit ? 'Update Service' : 'Create Service'}
            </button>
            <Link
              href="/admin/services"
              className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
