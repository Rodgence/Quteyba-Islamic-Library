import { Head, Link, useForm } from '@inertiajs/react'
import AdminLayout from '@/Layouts/AdminLayout'
import type { Opportunity } from '@/Types'
import { ArrowRight } from 'lucide-react'

interface SelectOption {
  id: number
  name: string
}

interface Props {
  opportunity: Opportunity | null
  types: SelectOption[]
  categories: SelectOption[]
  countries: SelectOption[]
}

function getLocalized(value: unknown): string {
  if (typeof value === 'object' && value !== null && 'ar' in value) {
    return String((value as Record<string, string>).ar)
  }
  return String(value ?? '')
}

function getFieldValue(value: unknown): string {
  if (typeof value === 'object' && value !== null && 'ar' in value) {
    return JSON.stringify(value)
  }
  return String(value ?? '')
}

const statusOptions = [
  { value: 'draft', label: 'مسودة' },
  { value: 'scheduled', label: 'مجدولة' },
  { value: 'published', label: 'منشورة' },
  { value: 'closed', label: 'مغلقة' },
  { value: 'archived', label: 'مؤرشفة' },
]

const inputClass =
  'w-full rounded-xl border border-[#e0e0e0] bg-white px-4 py-2.5 text-sm text-[#101828] placeholder:text-[#101828]/40 focus:border-[#073B33] focus:outline-none focus:ring-1 focus:ring-[#073B33]/20'
const labelClass = 'mb-1.5 block text-sm font-medium text-[#101828]'

export default function OpportunityForm({ opportunity, types, categories, countries }: Props) {
  const isEdit = opportunity !== null

  const { data, setData, post, put, processing, errors } = useForm({
    title: getFieldValue(opportunity?.title ?? ''),
    slug: opportunity?.slug ?? '',
    excerpt: getFieldValue(opportunity?.excerpt ?? ''),
    content: getFieldValue(opportunity?.content ?? ''),
    opportunity_type_id: String(opportunity?.opportunity_type?.id ?? ''),
    category_id: String(opportunity?.category?.id ?? ''),
    country_id: String(opportunity?.country?.id ?? ''),
    organization: opportunity?.organization ?? '',
    funding_type: opportunity?.funding_type ?? '',
    application_deadline: opportunity?.application_deadline ?? '',
    application_url: opportunity?.application_url ?? '',
    status: opportunity?.status ?? 'draft',
    is_featured: opportunity?.is_featured ?? false,
    published_at: opportunity?.published_at ?? '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isEdit) {
      put(`/admin/opportunities/${opportunity.id}`)
    } else {
      post('/admin/opportunities')
    }
  }

  return (
    <AdminLayout title={isEdit ? 'تعديل فرصة' : 'إضافة فرصة'}>
      <div className="mx-auto max-w-3xl px-4 py-6">
        <div className="mb-6 flex items-center gap-3">
          <Link
            href="/admin/opportunities"
            className="rounded-lg p-2 text-[#101828]/50 transition-colors hover:bg-[#073B33]/10 hover:text-[#073B33]"
          >
            <ArrowRight className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold text-[#101828]">
            {isEdit ? 'تعديل فرصة' : 'إضافة فرصة'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="rounded-2xl border border-[#e0e0e0] bg-white p-5">
            <h2 className="mb-4 text-base font-semibold text-[#101828]">المعلومات الأساسية</h2>

            <div className="space-y-4">
              <div>
                <label className={labelClass}>العنوان (JSON - النص العربي)</label>
                <textarea
                  value={data.title}
                  onChange={(e) => setData('title', e.target.value)}
                  rows={2}
                  placeholder='{"ar": "نص عربي"}'
                  className={inputClass}
                />
                {errors.title && <p className="mt-1 text-xs text-[#E91E63]">{errors.title}</p>}
              </div>

              <div>
                <label className={labelClass}>الرابط (slug)</label>
                <input
                  type="text"
                  value={data.slug}
                  onChange={(e) => setData('slug', e.target.value)}
                  className={inputClass}
                />
                {errors.slug && <p className="mt-1 text-xs text-[#E91E63]">{errors.slug}</p>}
              </div>

              <div>
                <label className={labelClass}>الملخص (JSON - النص العربي)</label>
                <textarea
                  value={data.excerpt}
                  onChange={(e) => setData('excerpt', e.target.value)}
                  rows={2}
                  placeholder='{"ar": "ملخص بالعربية"}'
                  className={inputClass}
                />
                {errors.excerpt && <p className="mt-1 text-xs text-[#E91E63]">{errors.excerpt}</p>}
              </div>

              <div>
                <label className={labelClass}>المحتوى (HTML)</label>
                <textarea
                  value={data.content}
                  onChange={(e) => setData('content', e.target.value)}
                  rows={8}
                  placeholder="<p>محتوى الفرصة...</p>"
                  className={inputClass}
                />
                {errors.content && <p className="mt-1 text-xs text-[#E91E63]">{errors.content}</p>}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#e0e0e0] bg-white p-5">
            <h2 className="mb-4 text-base font-semibold text-[#101828]">التصنيف</h2>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className={labelClass}>نوع الفرصة</label>
                <select
                  value={data.opportunity_type_id}
                  onChange={(e) => setData('opportunity_type_id', e.target.value)}
                  className={inputClass}
                >
                  <option value="">اختر النوع</option>
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
                <label className={labelClass}>التصنيف</label>
                <select
                  value={data.category_id}
                  onChange={(e) => setData('category_id', e.target.value)}
                  className={inputClass}
                >
                  <option value="">اختر التصنيف</option>
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
                <label className={labelClass}>الدولة</label>
                <select
                  value={data.country_id}
                  onChange={(e) => setData('country_id', e.target.value)}
                  className={inputClass}
                >
                  <option value="">اختر الدولة</option>
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
                <label className={labelClass}>الجهة المنظمة</label>
                <input
                  type="text"
                  value={data.organization}
                  onChange={(e) => setData('organization', e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>نوع التمويل</label>
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
            <h2 className="mb-4 text-base font-semibold text-[#101828]">التقديم والنشر</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>آخر موعد للتقديم</label>
                <input
                  type="date"
                  value={data.application_deadline}
                  onChange={(e) => setData('application_deadline', e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>رابط التقديم</label>
                <input
                  type="url"
                  value={data.application_url}
                  onChange={(e) => setData('application_url', e.target.value)}
                  placeholder="https://example.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>الحالة</label>
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
                <label className={labelClass}>تاريخ النشر</label>
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
                  فرصة مميزة
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
              {isEdit ? 'تحديث' : 'حفظ'}
            </button>
            <Link
              href="/admin/opportunities"
              className="rounded-xl border border-[#e0e0e0] px-6 py-2.5 text-sm font-medium text-[#101828] transition-colors hover:bg-[#f0f0f0]"
            >
              إلغاء
            </Link>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
