import { Link, useForm } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import AdminLayout from '@/Layouts/AdminLayout'
import RichTextEditor from '@/Components/RichTextEditor'
import type { Opportunity } from '@/Types'
import { ArrowLeft, ImagePlus, X } from 'lucide-react'
import { getLocalized, getLocaleValue } from '@/lib/localization'

interface SelectOption {
  id: number
  name: string
}

interface Props {
  opportunity: (Opportunity & {
    opportunity_type_id?: number | null
    category_id?: number | null
    country_id?: number | null
  }) | null
  types: SelectOption[]
  categories: SelectOption[]
  countries: SelectOption[]
}

const statusOptions = [
  { value: 'draft', label: 'Draft' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'published', label: 'Published' },
  { value: 'closed', label: 'Closed' },
  { value: 'archived', label: 'Archived' },
]

const inputClass =
  'w-full rounded-xl border border-[#e0e0e0] bg-white px-4 py-2.5 text-sm text-[#101828] placeholder:text-[#101828]/40 focus:border-[#073B33] focus:outline-none focus:ring-1 focus:ring-[#073B33]/20'
const labelClass = 'mb-1.5 block text-sm font-medium text-[#101828]'

export default function OpportunityForm({ opportunity, types, categories, countries }: Props) {
  const isEdit = opportunity !== null
  const [previewUrl, setPreviewUrl] = useState<string | null>(opportunity?.featured_image?.url ?? null)

  const { data, setData, post, processing, errors } = useForm({
    _method: isEdit ? 'put' : 'post',
    title: getLocaleValue(opportunity?.title, 'en'),
    title_ar: getLocaleValue(opportunity?.title, 'ar'),
    slug: opportunity?.slug ?? '',
    excerpt: getLocaleValue(opportunity?.excerpt, 'en'),
    excerpt_ar: getLocaleValue(opportunity?.excerpt, 'ar'),
    content: getLocaleValue(opportunity?.content, 'en'),
    content_ar: getLocaleValue(opportunity?.content, 'ar'),
    opportunity_type_id: String(opportunity?.opportunity_type_id ?? opportunity?.opportunity_type?.id ?? ''),
    category_id: String(opportunity?.category_id ?? opportunity?.category?.id ?? ''),
    country_id: String(opportunity?.country_id ?? opportunity?.country?.id ?? ''),
    organization: opportunity?.organization ?? '',
    funding_type: opportunity?.funding_type ?? '',
    application_deadline: opportunity?.application_deadline ?? '',
    application_url: opportunity?.application_url ?? '',
    status: opportunity?.status ?? 'draft',
    is_featured: opportunity?.is_featured ?? false,
    published_at: opportunity?.published_at ?? '',
    featured_image: null as File | null,
    featured_image_alt: opportunity?.featured_image?.alt_text ?? '',
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
    post(isEdit ? `/admin/opportunities/${opportunity.id}` : '/admin/opportunities', {
      forceFormData: true,
    })
  }

  const handleRemoveImage = () => {
    setData('featured_image', null)
    setData('remove_featured_image', true)
    setPreviewUrl(null)
  }

  return (
    <AdminLayout title={isEdit ? 'Edit Opportunity' : 'Add Opportunity'}>
      <div className="mx-auto max-w-3xl px-4 py-6">
        <div className="mb-6 flex items-center gap-3">
          <Link
            href="/admin/opportunities"
            className="rounded-lg p-2 text-[#101828]/50 transition-colors hover:bg-[#073B33]/10 hover:text-[#073B33]"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold text-[#101828]">
            {isEdit ? 'Edit Opportunity' : 'Add Opportunity'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="rounded-2xl border border-[#e0e0e0] bg-white p-5">
            <h2 className="mb-4 text-base font-semibold text-[#101828]">Basic Information</h2>

            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Title (English)</label>
                  <textarea
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    rows={2}
                    placeholder="Opportunity title"
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
                    placeholder="عنوان الفرصة"
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
                  onChange={(e) => setData('slug', e.target.value)}
                  className={inputClass}
                />
                {errors.slug && <p className="mt-1 text-xs text-[#E91E63]">{errors.slug}</p>}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Excerpt (English)</label>
                  <textarea
                    value={data.excerpt}
                    onChange={(e) => setData('excerpt', e.target.value)}
                    rows={2}
                    placeholder="Short excerpt"
                    className={inputClass}
                  />
                  {errors.excerpt && <p className="mt-1 text-xs text-[#E91E63]">{errors.excerpt}</p>}
                </div>
                <div>
                  <label className={labelClass}>Excerpt (Arabic)</label>
                  <textarea
                    value={data.excerpt_ar}
                    onChange={(e) => setData('excerpt_ar', e.target.value)}
                    rows={2}
                    dir="rtl"
                    placeholder="مقتطف قصير"
                    className={inputClass}
                  />
                  {errors.excerpt_ar && <p className="mt-1 text-xs text-[#E91E63]">{errors.excerpt_ar}</p>}
                </div>
              </div>

              <div>
                <label className={labelClass}>Description (English)</label>
                <RichTextEditor
                  value={data.content}
                  onChange={(html) => setData('content', html)}
                  placeholder="Write the opportunity description..."
                />
                {errors.content && <p className="mt-1 text-xs text-[#E91E63]">{errors.content}</p>}
              </div>

              <div>
                <label className={labelClass}>Description (Arabic)</label>
                <RichTextEditor
                  value={data.content_ar}
                  onChange={(html) => setData('content_ar', html)}
                  placeholder="اكتب وصف الفرصة..."
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
                  <img
                    src={previewUrl}
                    alt="Featured image preview"
                    className="aspect-video h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-video items-center justify-center text-gray-400">
                    <ImagePlus className="h-10 w-10" />
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Upload Image</label>
                  <p className="mb-2 text-xs text-gray-500">
                    Required for published posts and used in WhatsApp link previews.
                  </p>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={(event) => {
                      const file = event.target.files?.[0] ?? null
                      setData('featured_image', file)
                      if (file) setData('remove_featured_image', false)
                    }}
                    className="block w-full rounded-xl border border-[#e0e0e0] bg-white text-sm text-gray-600 file:mr-4 file:border-0 file:bg-[#073B33] file:px-4 file:py-2.5 file:text-sm file:font-medium file:text-white hover:file:bg-[#052a25]"
                  />
                  <p className="mt-1 text-xs text-gray-500">JPG, PNG, WebP, or GIF. Maximum size: 5 MB.</p>
                  {errors.featured_image && (
                    <p className="mt-1 text-xs text-[#E91E63]">{errors.featured_image}</p>
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
                    <p className="mt-1 text-xs text-[#E91E63]">{errors.featured_image_alt}</p>
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
          </div>

          <div className="rounded-2xl border border-[#e0e0e0] bg-white p-5">
            <h2 className="mb-4 text-base font-semibold text-[#101828]">Classification</h2>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className={labelClass}>Opportunity Type</label>
                <select
                  value={data.opportunity_type_id}
                  onChange={(e) => setData('opportunity_type_id', e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select Type</option>
                  {types.map((t) => (
                    <option key={t.id} value={t.id}>
                      {getLocalized(t.name)}
                    </option>
                  ))}
                </select>
                {errors.opportunity_type_id && (
                  <p className="mt-1 text-xs text-[#E91E63]">{errors.opportunity_type_id}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>Category</label>
                <select
                  value={data.category_id}
                  onChange={(e) => setData('category_id', e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {getLocalized(c.name)}
                    </option>
                  ))}
                </select>
                {errors.category_id && (
                  <p className="mt-1 text-xs text-[#E91E63]">{errors.category_id}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>Country</label>
                <select
                  value={data.country_id}
                  onChange={(e) => setData('country_id', e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select Country</option>
                  {countries.map((c) => (
                    <option key={c.id} value={c.id}>
                      {getLocalized(c.name)}
                    </option>
                  ))}
                </select>
                {errors.country_id && (
                  <p className="mt-1 text-xs text-[#E91E63]">{errors.country_id}</p>
                )}
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Organization</label>
                <input
                  type="text"
                  value={data.organization}
                  onChange={(e) => setData('organization', e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Funding Type</label>
                <input
                  type="text"
                  value={data.funding_type}
                  onChange={(e) => setData('funding_type', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#e0e0e0] bg-white p-5">
            <h2 className="mb-4 text-base font-semibold text-[#101828]">Application & Publishing</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Application Deadline</label>
                <input
                  type="date"
                  value={data.application_deadline}
                  onChange={(e) => setData('application_deadline', e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Application URL</label>
                <input
                  type="url"
                  value={data.application_url}
                  onChange={(e) => setData('application_url', e.target.value)}
                  placeholder="https://example.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Status</label>
                <select
                  value={data.status}
                  onChange={(e) => setData('status', e.target.value as Opportunity['status'])}
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

              <div>
                <label className={labelClass}>Published At</label>
                <input
                  type="datetime-local"
                  value={data.published_at}
                  onChange={(e) => setData('published_at', e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={data.is_featured}
                  onChange={(e) => setData('is_featured', e.target.checked)}
                  className="h-4 w-4 rounded border-[#e0e0e0] text-[#073B33] focus:ring-[#073B33]"
                />
                <label htmlFor="is_featured" className="text-sm font-medium text-[#101828]">
                  Featured Opportunity
                </label>
              </div>
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
              href="/admin/opportunities"
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
