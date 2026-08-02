import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useForm } from '@inertiajs/react'
import { ArrowLeft, ImagePlus, Save, X } from 'lucide-react'
import AdminLayout from '@/Layouts/AdminLayout'
import RichTextEditor from '@/Components/RichTextEditor'

interface CourseFormData {
  id: number
  name: string
  slug: string
  description: string
  language: string
  level: string
  duration: string | null
  delivery_method: string
  instructor: string | null
  price: number | null
  price_currency: string | null
  registration_status: 'open' | 'closed' | 'soon'
  status: 'draft' | 'published' | 'archived'
  featured_image: {
    url: string
    alt_text: string | null
  } | null
}

interface Props {
  course: CourseFormData | null
}

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#073B33] focus:outline-none focus:ring-1 focus:ring-[#073B33]/20'
const labelClass = 'mb-1.5 block text-sm font-medium text-gray-700'

export default function CourseForm({ course }: Props) {
  const isEdit = course !== null
  const [previewUrl, setPreviewUrl] = useState<string | null>(course?.featured_image?.url ?? null)
  const { data, setData, post, processing, errors } = useForm({
    _method: isEdit ? 'put' : 'post',
    name: course?.name ?? '',
    slug: course?.slug ?? '',
    description: course?.description ?? '',
    language: course?.language ?? '',
    level: course?.level ?? '',
    duration: course?.duration ?? '',
    delivery_method: course?.delivery_method ?? '',
    instructor: course?.instructor ?? '',
    price: course?.price?.toString() ?? '',
    price_currency: course?.price_currency ?? 'USD',
    registration_status: course?.registration_status ?? 'open',
    status: course?.status ?? 'draft',
    featured_image: null as File | null,
    featured_image_alt: course?.featured_image?.alt_text ?? '',
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
    post(isEdit ? `/admin/courses/${course.id}` : '/admin/courses', {
      forceFormData: true,
    })
  }

  const removeImage = () => {
    setData('featured_image', null)
    setData('remove_featured_image', true)
    setPreviewUrl(null)
  }

  return (
    <AdminLayout title={isEdit ? 'Edit Course' : 'Add Course'}>
      <div className="mx-auto max-w-4xl p-4 lg:p-6">
        <div className="mb-6 flex items-center gap-3">
          <Link href="/admin/courses" className="rounded-lg p-2 text-gray-500 hover:bg-[#073B33]/10 hover:text-[#073B33]">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-[#073B33]">{isEdit ? 'Edit Course' : 'Add Course'}</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <section className="rounded-2xl border border-gray-200 bg-white p-5">
            <h2 className="mb-4 font-semibold text-gray-900">Course Content</h2>
            <div className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Name</label>
                  <input value={data.name} onChange={(e) => setData('name', e.target.value)} className={inputClass} />
                  {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                </div>
                <div>
                  <label className={labelClass}>Slug</label>
                  <input value={data.slug} onChange={(e) => setData('slug', e.target.value)} className={inputClass} />
                  {errors.slug && <p className="mt-1 text-xs text-red-600">{errors.slug}</p>}
                </div>
              </div>
              <div>
                <label className={labelClass}>Description</label>
                <RichTextEditor
                  value={data.description}
                  onChange={(html) => setData('description', html)}
                  placeholder="Write the course description..."
                />
                {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-white p-5">
            <h2 className="mb-4 font-semibold text-gray-900">Featured Image</h2>
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
                    className="block w-full rounded-xl border border-gray-200 bg-white text-sm text-gray-600 file:mr-4 file:border-0 file:bg-[#073B33] file:px-4 file:py-2.5 file:text-white"
                  />
                  <p className="mt-1 text-xs text-gray-500">JPG, PNG, WebP, or GIF. Maximum size: 5 MB.</p>
                  {errors.featured_image && <p className="mt-1 text-xs text-red-600">{errors.featured_image}</p>}
                </div>
                <div>
                  <label className={labelClass}>Alternative Text</label>
                  <input
                    value={data.featured_image_alt}
                    onChange={(e) => setData('featured_image_alt', e.target.value)}
                    className={inputClass}
                    placeholder="Describe the image"
                  />
                </div>
                {previewUrl && (
                  <button type="button" onClick={removeImage} className="inline-flex items-center gap-1 text-sm text-red-600">
                    <X className="h-4 w-4" />
                    Remove featured image
                  </button>
                )}
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-white p-5">
            <h2 className="mb-4 font-semibold text-gray-900">Course Details</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className={labelClass}>Language</label>
                <input value={data.language} onChange={(e) => setData('language', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Level</label>
                <input value={data.level} onChange={(e) => setData('level', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Duration</label>
                <input value={data.duration} onChange={(e) => setData('duration', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Delivery Method</label>
                <input value={data.delivery_method} onChange={(e) => setData('delivery_method', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Instructor</label>
                <input value={data.instructor} onChange={(e) => setData('instructor', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Price</label>
                <input type="number" min="0" step="0.01" value={data.price} onChange={(e) => setData('price', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Currency</label>
                <input maxLength={3} value={data.price_currency} onChange={(e) => setData('price_currency', e.target.value.toUpperCase())} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Registration</label>
                <select value={data.registration_status} onChange={(e) => setData('registration_status', e.target.value as 'open' | 'closed' | 'soon')} className={inputClass}>
                  <option value="open">Open</option>
                  <option value="soon">Coming Soon</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Publishing Status</label>
                <select value={data.status} onChange={(e) => setData('status', e.target.value as 'draft' | 'published' | 'archived')} className={inputClass}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </section>

          <div className="flex gap-3">
            <button disabled={processing} className="inline-flex items-center gap-2 rounded-xl bg-[#073B33] px-6 py-3 text-sm font-semibold text-white disabled:opacity-50">
              <Save className="h-4 w-4" />
              {processing ? 'Saving...' : isEdit ? 'Update Course' : 'Create Course'}
            </button>
            <Link href="/admin/courses" className="rounded-xl border border-gray-200 px-6 py-3 text-sm text-gray-600">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
