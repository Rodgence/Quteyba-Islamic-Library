import { Head, Link, router } from '@inertiajs/react'
import PublicLayout from '@/Layouts/PublicLayout'
import type { Paginated, Opportunity } from '@/Types'
import { Search, Filter, ArrowRight, Calendar, MapPin, Clock } from 'lucide-react'
import { useState } from 'react'
import { getLocalized } from '@/lib/localization'

interface FilterOption {
  name: string
  slug: string
}

interface Filters {
  search: string
  type: string
  country: string
  category: string
  funding: string
  education: string
  status_filter: string
  sort: string
}

interface Props {
  opportunities: Paginated<Opportunity>
  types: FilterOption[]
  countries: FilterOption[]
  categories: FilterOption[]
  filters: Filters
  seo: Record<string, unknown>
}

const fundingOptions = [
  { name: 'الكل', slug: '' },
  { name: 'تمويل كامل', slug: 'full' },
  { name: 'تمويل جزئي', slug: 'partial' },
  { name: 'براتب', slug: 'salary' },
  { name: 'بدون تمويل', slug: 'none' },
]

const educationOptions = [
  { name: 'الكل', slug: '' },
  { name: 'البكالوريوس', slug: 'bachelor' },
  { name: 'الماجستير', slug: 'master' },
  { name: 'الدكتوراه', slug: 'phd' },
  { name: 'الدبلوم', slug: 'diploma' },
]

const statusOptions = [
  { name: 'الكل', slug: '' },
  { name: 'مفتوح', slug: 'open' },
  { name: 'مغلق', slug: 'closed' },
]

const sortOptions = [
  { name: 'الأحدث', slug: 'newest' },
  { name: 'الأقدم', slug: 'oldest' },
  { name: 'الأقرب انتهاءً', slug: 'deadline' },
]

function getStatusLabel(status: string): { label: string; className: string } {
  if (status === 'closed' || status === 'archived') {
    return { label: 'مغلق', className: 'bg-red-50 text-red-600' }
  }
  return { label: 'مفتوح', className: 'bg-emerald-50 text-emerald-600' }
}

function formatDate(date: string | null): string {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function OpportunitiesPage({ opportunities, types, countries, categories, filters, seo }: Props) {
  const [showFilters, setShowFilters] = useState(false)
  const selectedType = types.find((type) => type.slug === filters.type)
  const pageTitle = selectedType ? getLocalized(selectedType.name) : 'الفرص'
  const seoTitle = typeof seo.title === 'string' ? seo.title : pageTitle
  const seoDescription = typeof seo.description === 'string' ? seo.description : ''

  const updateFilter = (key: string, value: string) => {
    const params: Record<string, string | undefined> = {}
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.forEach((v, k) => {
      if (k !== 'page') params[k] = v
    })

    if (value) {
      params[key] = value
    } else {
      delete params[key]
    }

    const cleanParams: Record<string, string> = {}
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined) cleanParams[k] = v
    })

    router.get(window.location.pathname, cleanParams, { preserveState: true, replace: true })
  }

  const clearFilters = () => {
    router.get(window.location.pathname, {}, { preserveState: true, replace: true })
  }

  const hasActiveFilters = filters.search || filters.type || filters.country || filters.category || filters.funding || filters.education || filters.status_filter

  return (
    <PublicLayout>
      <Head title={seoTitle}>
        {seoDescription && <meta name="description" content={seoDescription} />}
      </Head>
      <section className="bg-[#073B33] text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
          <h1 className="text-2xl font-bold sm:text-3xl">{pageTitle}</h1>
          <p className="mt-2 text-sm opacity-80">
            {selectedType
              ? `تصفح أحدث فرص ${pageTitle} من مصادر موثوقة`
              : 'اكتشف أحدث المنح الدراسية والوظائف والتدريب من مصادر موثوقة'}
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
            <div className="relative flex-1">
              <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#101828]/40" />
              <input
                type="text"
                placeholder="ابحث عن فرصة..."
                defaultValue={filters.search}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') updateFilter('search', (e.target as HTMLInputElement).value)
                }}
                className="w-full rounded-xl border border-border bg-white py-2.5 ps-9 pe-4 text-sm text-[#101828] placeholder:text-[#101828]/40 focus:border-[#073B33] focus:outline-none focus:ring-1 focus:ring-[#073B33]/20"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-medium text-[#101828] transition-colors hover:bg-[#073B33]/5 lg:hidden"
              >
                <Filter className="h-4 w-4" />
                تصفية
              </button>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="rounded-xl px-4 py-2.5 text-sm text-[#E91E63] transition-colors hover:bg-[#E91E63]/5"
                >
                  مسح الفلاتر
                </button>
              )}
            </div>

            <div className={`flex flex-wrap gap-3 ${showFilters ? 'flex' : 'hidden'} lg:flex`}>
              <select
                value={filters.type}
                onChange={(e) => updateFilter('type', e.target.value)}
                className="rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-[#101828] focus:border-[#073B33] focus:outline-none focus:ring-1 focus:ring-[#073B33]/20"
              >
                <option value="">نوع الفرصة</option>
                {types.map((t) => (
                  <option key={t.slug} value={t.slug}>{getLocalized(t.name)}</option>
                ))}
              </select>

              <select
                value={filters.country}
                onChange={(e) => updateFilter('country', e.target.value)}
                className="rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-[#101828] focus:border-[#073B33] focus:outline-none focus:ring-1 focus:ring-[#073B33]/20"
              >
                <option value="">الدولة</option>
                {countries.map((c) => (
                  <option key={c.slug} value={c.slug}>{getLocalized(c.name)}</option>
                ))}
              </select>

              <select
                value={filters.category}
                onChange={(e) => updateFilter('category', e.target.value)}
                className="rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-[#101828] focus:border-[#073B33] focus:outline-none focus:ring-1 focus:ring-[#073B33]/20"
              >
                <option value="">التصنيف</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>{getLocalized(c.name)}</option>
                ))}
              </select>

              <select
                value={filters.funding}
                onChange={(e) => updateFilter('funding', e.target.value)}
                className="rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-[#101828] focus:border-[#073B33] focus:outline-none focus:ring-1 focus:ring-[#073B33]/20"
              >
                <option value="">نوع التمويل</option>
                {fundingOptions.map((o) => (
                  <option key={o.slug} value={o.slug}>{o.name}</option>
                ))}
              </select>

              <select
                value={filters.education}
                onChange={(e) => updateFilter('education', e.target.value)}
                className="rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-[#101828] focus:border-[#073B33] focus:outline-none focus:ring-1 focus:ring-[#073B33]/20"
              >
                <option value="">المستوى التعليمي</option>
                {educationOptions.map((o) => (
                  <option key={o.slug} value={o.slug}>{o.name}</option>
                ))}
              </select>

              <select
                value={filters.status_filter}
                onChange={(e) => updateFilter('status_filter', e.target.value)}
                className="rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-[#101828] focus:border-[#073B33] focus:outline-none focus:ring-1 focus:ring-[#073B33]/20"
              >
                <option value="">الحالة</option>
                {statusOptions.map((o) => (
                  <option key={o.slug} value={o.slug}>{o.name}</option>
                ))}
              </select>

              <select
                value={filters.sort}
                onChange={(e) => updateFilter('sort', e.target.value)}
                className="rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-[#101828] focus:border-[#073B33] focus:outline-none focus:ring-1 focus:ring-[#073B33]/20"
              >
                {sortOptions.map((o) => (
                  <option key={o.slug} value={o.slug}>{o.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-[#101828]/60">
              {opportunities.total} نتيجة
            </p>
          </div>

          {opportunities.data.length === 0 ? (
            <div className="rounded-2xl border border-border bg-white py-16 text-center">
              <Search className="mx-auto mb-3 h-10 w-10 text-[#073B33]/15" />
              <p className="text-sm text-[#101828]/50">لا توجد فرص مطابقة لمعايير البحث</p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {opportunities.data.map((opportunity) => {
                const statusInfo = getStatusLabel(opportunity.status)
                const oppTitle = getLocalized(opportunity.title)
                const oppExcerpt = getLocalized(opportunity.excerpt)
                const typeName = getLocalized(opportunity.opportunity_type?.name)
                const countryName = getLocalized(opportunity.country?.name)
                const imageUrl = opportunity.featured_image?.url

                return (
                  <article
                    key={opportunity.id}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-md"
                  >
                    <Link href={`/opportunities/${opportunity.slug}`} className="relative block aspect-[16/9] overflow-hidden bg-[#073B33]/5">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={oppTitle}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Calendar className="h-10 w-10 text-[#073B33]/15" />
                        </div>
                      )}

                      {typeName && (
                        <span className="absolute start-3 top-3 rounded-lg bg-[#E91E63] px-2.5 py-1 text-xs font-semibold text-white">
                          {typeName}
                        </span>
                      )}

                      <span className={`absolute end-3 top-3 rounded-lg px-2.5 py-1 text-xs font-semibold ${statusInfo.className}`}>
                        {statusInfo.label}
                      </span>
                    </Link>

                    <div className="flex flex-1 flex-col gap-3 p-4">
                      {countryName && (
                        <div className="flex items-center gap-1.5 text-xs text-[#101828]/60">
                          <MapPin className="h-3.5 w-3.5 text-[#E91E63]" />
                          <span>{countryName}</span>
                        </div>
                      )}

                      <Link
                        href={`/opportunities/${opportunity.slug}`}
                        className="text-base font-semibold leading-snug text-[#101828] transition-colors hover:text-[#073B33]"
                      >
                        {oppTitle}
                      </Link>

                      {oppExcerpt && (
                        <p className="line-clamp-2 text-sm leading-relaxed text-[#101828]/60">
                          {oppExcerpt}
                        </p>
                      )}

                      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-3 text-xs text-[#101828]/60">
                        {opportunity.funding_type && (
                          <span className="inline-flex items-center gap-1.5 font-medium text-[#073B33]">
                            {opportunity.funding_type}
                          </span>
                        )}

                        {opportunity.application_deadline && (
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" />
                            {formatDate(opportunity.application_deadline)}
                          </span>
                        )}

                        <Link
                          href={`/opportunities/${opportunity.slug}`}
                          className="ms-auto inline-flex items-center gap-1 font-semibold text-[#E91E63] transition-colors hover:text-[#c2185b]"
                        >
                          التفاصيل
                          <ArrowRight className="h-3 w-3 rtl:rotate-180" />
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}

          {opportunities.last_page > 1 && (
            <nav className="mt-8 flex items-center justify-center gap-1">
              {opportunities.links.map((link, index) => {
                if (link.url === null) {
                  return (
                    <span
                      key={index}
                      className="inline-flex h-9 min-w-[2.25rem] items-center justify-center rounded-lg px-3 text-sm text-[#101828]/30"
                      dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                  )
                }

                return (
                  <Link
                    key={index}
                    href={link.url}
                    preserveState
                    className={`inline-flex h-9 min-w-[2.25rem] items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors ${
                      link.active
                        ? 'bg-[#073B33] text-white'
                        : 'text-[#101828] hover:bg-[#073B33]/10'
                    }`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  />
                )
              })}
            </nav>
          )}
        </div>
      </section>
    </PublicLayout>
  )
}
