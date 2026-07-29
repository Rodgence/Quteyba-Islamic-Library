import { Head, Link, useForm } from '@inertiajs/react'
import AdminLayout from '@/Layouts/AdminLayout'
import type { Opportunity } from '@/Types'
import { ArrowLeft } from 'lucide-react'

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
  if (typeof value === 'object' && value !== null && 'en' in value) {
    return String((value as Record<string, string>).en)
  }
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
              <div>
                <label className={labelClass}>Title (JSON)</label>
                <textarea
                  value={data.title}
                  onChange={(e) => setData('title', e.target.value)}
                  rows={2}
                  placeholder='{"en": "Opportunity title"}'
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
                <label className={labelClass}>Excerpt (JSON)</label>
                <textarea
                  value={data.excerpt}
                  onChange={(e) => setData('excerpt', e.target.value)}
                  rows={2}
                  placeholder='{"en": "Short excerpt"}'
                  className={inputClass}
                />
                {errors.excerpt && <p className="mt-1 text-xs text-[#E91E63]">{errors.excerpt}</p>}
              </div>

              <div>
                <label className={labelClass}>Content (HTML)</label>
                <textarea
                  value={data.content}
                  onChange={(e) => setData('content', e.target.value)}
                  rows={8}
                  placeholder="<p>Opportunity content...</p>"
                  className={inputClass}
                />
                {errors.content && <p className="mt-1 text-xs text-[#E91E63]">{errors.content}</p>}
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
