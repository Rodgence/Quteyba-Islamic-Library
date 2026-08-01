import { Link, Head, useForm } from '@inertiajs/react'
import { useState } from 'react'
import PublicLayout from '@/Layouts/PublicLayout'
import { socialLinks } from '@/lib/socialLinks'
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Building,
  GraduationCap,
  DollarSign,
  Share2,
  ExternalLink,
  MessageCircle,
  Send,
} from 'lucide-react'
import { getLocalized } from '@/lib/localization'

interface RelatedOpportunity {
  title: unknown
  slug: string
  excerpt: unknown
  opportunity_type: { name?: unknown } | string | null
  country: { name?: unknown } | string | null
  featured_image: { url: string; alt_text: string | null } | null
  application_deadline: string | null
  status: string
}

interface SEOProps {
  title?: string
  description?: string
  og_image?: string
  canonical_url?: string
  og_type?: string
}

interface MediaImage {
  url: string
  alt_text: string | null
}

function getImageUrl(image: MediaImage | null | undefined): string | null {
  return image?.url ?? null
}

function getImageAlt(image: MediaImage | null | undefined): string | null {
  return image?.alt_text ?? null
}

function formatDate(dateString: string | null): string {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function isClosed(deadline: string | null, status: string): boolean {
  if (status === 'closed' || status === 'archived') return true
  if (!deadline) return false
  return new Date(deadline) < new Date()
}

export default function OpportunityDetail({
  opportunity,
  related = [],
  seo,
}: {
  opportunity: Record<string, unknown>
  related?: RelatedOpportunity[]
  seo?: SEOProps
}) {
  const opp = opportunity as Record<string, unknown>

  const title = getLocalized(opp.title)
  const content = getLocalized(opp.content)
  const excerpt = getLocalized(opp.excerpt)
  const benefits = getLocalized(opp.benefits)
  const eligibility = getLocalized(opp.eligibility)
  const requiredDocuments = getLocalized(opp.required_documents)
  const applicationProcess = getLocalized(opp.application_process)
  const importantNotes = getLocalized(opp.important_notes)

  const opportunityType = getLocalized((opp.opportunity_type as Record<string, unknown>)?.name)
  const countryName = getLocalized((opp.country as Record<string, unknown>)?.name)
  const organization = (opp.organization as string) || ''
  const fundingType = (opp.funding_type as string) || ''
  const educationLevel = (opp.education_level as string) || ''
  const employmentType = (opp.employment_type as string) || ''
  const salaryAmount = opp.salary_amount as number | null
  const salaryCurrency = (opp.salary_currency as string) || ''
  const salaryPeriod = (opp.salary_period as string) || ''
  const applicationDeadline = (opp.application_deadline as string) || null
  const applicationUrl = (opp.application_url as string) || null
  const officialSourceUrl = (opp.official_source_url as string) || null
  const status = (opp.status as string) || 'draft'
  const slug = (opp.slug as string) || ''
  const publishedAt = (opp.published_at as string) || null

  const featuredImage = opp.featured_image as MediaImage | null

  const deadlineClosed = isClosed(applicationDeadline, status)

  const seoTitle = seo?.title || title
  const seoDescription = seo?.description || excerpt

  const whatsappUrl = socialLinks.whatsapp
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`${title}\n${seo?.canonical_url || ''}`)}`

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
      } catch {
        await navigator.clipboard.writeText(url)
      }
    } else {
      await navigator.clipboard.writeText(url)
    }
  }

  const [showApplyForm, setShowApplyForm] = useState(false)
  const [applySubmitted, setApplySubmitted] = useState(false)
  const { data: applyData, setData: setApplyData, post: postApply, processing: applyProcessing, errors: applyErrors, reset: resetApply } = useForm({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    postApply(`/opportunities/${slug}/apply`, {
      onSuccess: () => {
        resetApply()
        setApplySubmitted(true)
        setShowApplyForm(false)
      },
    })
  }

  return (
    <PublicLayout>
      <Head>
        <title>{seoTitle}</title>
        {seoDescription && <meta name="description" content={seoDescription} />}
        <meta property="og:title" content={seoTitle} />
        {seoDescription && <meta property="og:description" content={seoDescription} />}
        <meta property="og:type" content={seo?.og_type || 'article'} />
        {seo?.og_image && <meta property="og:image" content={seo.og_image} />}
        {seo?.canonical_url && <meta property="og:url" content={seo.canonical_url} />}
        <meta name="twitter:card" content="summary_large_image" />
        {seo?.canonical_url && <link rel="canonical" href={seo.canonical_url} />}
      </Head>

      <div className="mx-auto max-w-7xl px-4 py-6" dir="ltr" lang="en">
        <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#073B33]">
            Home
          </Link>
          <span>/</span>
          <Link href="/opportunities" className="hover:text-[#073B33]">
            Opportunities
          </Link>
          <span>/</span>
          <span className="truncate text-gray-700">{title}</span>
        </nav>

        <div className="lg:flex lg:gap-10">
          <article className="min-w-0 flex-1">
            {getImageUrl(featuredImage) && (
              <div className="mb-6 overflow-hidden rounded-2xl">
                <img
                  src={getImageUrl(featuredImage)!}
                  alt={getImageAlt(featuredImage) || title}
                  className="aspect-video w-full object-cover"
                />
              </div>
            )}

            <div className="mb-4 flex flex-wrap items-center gap-3">
              {opportunityType && (
                <span className="inline-flex items-center rounded-xl bg-[#073B33]/10 px-3 py-1 text-xs font-semibold text-[#073B33]">
                  {opportunityType}
                </span>
              )}
              {status === 'closed' || deadlineClosed ? (
                <span className="inline-flex items-center rounded-xl bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                  Application closed
                </span>
              ) : null}
            </div>

            <h1 className="mb-4 text-2xl font-bold leading-snug text-gray-900 lg:text-3xl">
              {title}
            </h1>

            {excerpt && (
              <p className="mb-6 text-base leading-relaxed text-gray-600">{excerpt}</p>
            )}

            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-500">
              {countryName && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-[#E91E63]" />
                  {countryName}
                </span>
              )}
              {organization && (
                <span className="flex items-center gap-1.5">
                  <Building className="h-4 w-4 text-[#E91E63]" />
                  {organization}
                </span>
              )}
              {publishedAt && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-[#E91E63]" />
                  <span>
                    Published on {new Date(publishedAt).toLocaleDateString('en-US')}
                  </span>
                </span>
              )}
            </div>

            <div
              className="prose prose-lg max-w-none text-base leading-8 text-gray-800 sm:text-lg [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-1"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            <div className="mt-10 space-y-10 border-t border-gray-100 pt-8">
              {benefits && (
                <section>
                  <h2 className="mb-4 text-xl font-bold text-[#073B33]">Benefits</h2>
                  <div
                    className="prose prose-lg max-w-none text-gray-800 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-1"
                    dangerouslySetInnerHTML={{ __html: benefits }}
                  />
                </section>
              )}

              {eligibility && (
                <section>
                  <h2 className="mb-4 text-xl font-bold text-[#073B33]">Eligibility</h2>
                  <div
                    className="prose prose-lg max-w-none text-gray-800 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-1"
                    dangerouslySetInnerHTML={{ __html: eligibility }}
                  />
                </section>
              )}

              {requiredDocuments && (
                <section>
                  <h2 className="mb-4 text-xl font-bold text-[#073B33]">Required Documents</h2>
                  <div
                    className="prose prose-lg max-w-none text-gray-800 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-1"
                    dangerouslySetInnerHTML={{ __html: requiredDocuments }}
                  />
                </section>
              )}

              {applicationProcess && (
                <section>
                  <h2 className="mb-4 text-xl font-bold text-[#073B33]">How to Apply</h2>
                  <div
                    className="prose prose-lg max-w-none text-gray-800 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-1"
                    dangerouslySetInnerHTML={{ __html: applicationProcess }}
                  />
                </section>
              )}

              {importantNotes && (
                <section>
                  <h2 className="mb-4 text-xl font-bold text-[#073B33]">Important Notes</h2>
                  <div
                    className="prose prose-lg max-w-none text-gray-800 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-1"
                    dangerouslySetInnerHTML={{ __html: importantNotes }}
                  />
                </section>
              )}
            </div>

            <div className="mt-10 border-t border-gray-100 pt-6">
              <Link
                href="/opportunities"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#E91E63] hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Opportunities
              </Link>
            </div>
          </article>

          <aside className="mt-10 lg:mt-0 lg:w-80 lg:shrink-0">
            <div className="lg:sticky lg:top-24">
              <div className="space-y-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-gray-400">Opportunity Details</h3>
                  <div className="space-y-3">
                    {opportunityType && (
                      <div>
                        <span className="text-xs text-gray-400">Opportunity Type</span>
                        <p className="text-sm font-medium text-gray-800">{opportunityType}</p>
                      </div>
                    )}
                    {countryName && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#E91E63]" />
                        <div>
                          <span className="text-xs text-gray-400">Country</span>
                          <p className="text-sm font-medium text-gray-800">{countryName}</p>
                        </div>
                      </div>
                    )}
                    {organization && (
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-[#E91E63]" />
                        <div>
                          <span className="text-xs text-gray-400">Organization</span>
                          <p className="text-sm font-medium text-gray-800">{organization}</p>
                        </div>
                      </div>
                    )}
                    {fundingType && (
                      <div>
                        <span className="text-xs text-gray-400">Funding Type</span>
                        <p className="text-sm font-medium text-gray-800">{fundingType}</p>
                      </div>
                    )}
                    {educationLevel && (
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-[#E91E63]" />
                        <div>
                          <span className="text-xs text-gray-400">Education Level</span>
                          <p className="text-sm font-medium text-gray-800">{educationLevel}</p>
                        </div>
                      </div>
                    )}
                    {employmentType && (
                      <div>
                        <span className="text-xs text-gray-400">Employment Type</span>
                        <p className="text-sm font-medium text-gray-800">{employmentType}</p>
                      </div>
                    )}
                    {salaryAmount && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-[#E91E63]" />
                        <div>
                          <span className="text-xs text-gray-400">Salary</span>
                          <p className="text-sm font-medium text-gray-800">
                            {salaryAmount.toLocaleString()} {salaryCurrency}{' '}
                            {salaryPeriod && `/ ${salaryPeriod}`}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {applicationDeadline && (
                  <div className="rounded-xl bg-[#073B33]/5 px-4 py-3">
                    <span className="text-xs text-gray-400">Application Deadline</span>
                    <p className="text-sm font-bold text-gray-800">
                      {formatDate(applicationDeadline)}
                    </p>
                    {deadlineClosed && (
                      <p className="mt-1 text-xs font-semibold text-red-600">Application closed</p>
                    )}
                  </div>
                )}

                {applicationUrl && !deadlineClosed && (
                  <a
                    href={applicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#E91E63] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#c2185b]"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Apply Now
                  </a>
                )}

                {!deadlineClosed && (
                  <div className="rounded-xl border border-[#073B33]/15 bg-[#073B33]/5 p-4">
                    {applySubmitted ? (
                      <p className="text-sm font-medium text-[#073B33]">
                        Your application has been submitted successfully. Our team will be in touch soon.
                      </p>
                    ) : showApplyForm ? (
                      <form onSubmit={handleApplySubmit} className="space-y-3">
                        <p className="text-sm font-semibold text-[#073B33]">Apply Now Through Our Team</p>
                        <div>
                          <input
                            type="text"
                            placeholder="Full Name"
                            value={applyData.name}
                            onChange={(e) => setApplyData('name', e.target.value)}
                            required
                            className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-[#073B33] focus:outline-none"
                          />
                          {applyErrors.name && <p className="mt-1 text-xs text-red-600">{applyErrors.name}</p>}
                        </div>
                        <div>
                          <input
                            type="email"
                            placeholder="Email"
                            value={applyData.email}
                            onChange={(e) => setApplyData('email', e.target.value)}
                            required
                            dir="ltr"
                            className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-[#073B33] focus:outline-none"
                          />
                          {applyErrors.email && <p className="mt-1 text-xs text-red-600">{applyErrors.email}</p>}
                        </div>
                        <div>
                          <input
                            type="tel"
                            placeholder="Phone Number"
                            value={applyData.phone}
                            onChange={(e) => setApplyData('phone', e.target.value)}
                            dir="ltr"
                            className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-[#073B33] focus:outline-none"
                          />
                        </div>
                        <div>
                          <textarea
                            placeholder="Anything you'd like our team to know? (optional)"
                            rows={3}
                            value={applyData.message}
                            onChange={(e) => setApplyData('message', e.target.value)}
                            className="w-full resize-none rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-[#073B33] focus:outline-none"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="submit"
                            disabled={applyProcessing}
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#073B33] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#052b26] disabled:opacity-60"
                          >
                            <Send className="h-4 w-4" />
                            {applyProcessing ? 'Submitting...' : 'Submit Application'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowApplyForm(false)}
                            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-white"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <button
                        onClick={() => setShowApplyForm(true)}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#073B33] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#052b26]"
                      >
                        <Send className="h-4 w-4" />
                        Apply Now Through Our Team
                      </button>
                    )}
                  </div>
                )}

                {officialSourceUrl && (
                  <a
                    href={officialSourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Official Source
                  </a>
                )}

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#20bd5a]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Follow our WhatsApp Channel
                </a>

                <button
                  onClick={handleShare}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <Share2 className="h-4 w-4" />
                  Share Opportunity
                </button>
                <a
                  href={whatsappShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#25D366] px-4 py-3 text-sm font-semibold text-[#128C3E] transition-colors hover:bg-[#25D366]/5"
                >
                  <MessageCircle className="h-4 w-4" />
                  Share on WhatsApp
                </a>
              </div>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-2xl font-bold text-[#073B33]">Related Opportunities</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => {
                const itemDeadlineClosed = isClosed(item.application_deadline, item.status)
                const itemTitle = getLocalized(item.title)
                const itemExcerpt = getLocalized(item.excerpt)
                const itemType = getLocalized(
                  typeof item.opportunity_type === 'object'
                    ? item.opportunity_type?.name
                    : item.opportunity_type,
                )
                const itemCountry = getLocalized(
                  typeof item.country === 'object' ? item.country?.name : item.country,
                )
                return (
                  <Link
                    key={item.slug}
                    href={`/opportunities/${item.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-shadow hover:shadow-md"
                  >
                    <div className="aspect-video overflow-hidden bg-gray-100">
                      {getImageUrl(item.featured_image) ? (
                        <img
                          src={getImageUrl(item.featured_image)!}
                          alt={getImageAlt(item.featured_image) || itemTitle}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[#073B33]/5 text-sm text-gray-400">
                          Quteyba
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <div className="mb-2 flex items-center gap-2">
                        {itemType && (
                          <span className="rounded-lg bg-[#073B33]/10 px-2 py-0.5 text-[11px] font-semibold text-[#073B33]">
                            {itemType}
                          </span>
                        )}
                        {itemDeadlineClosed && (
                          <span className="rounded-lg bg-red-50 px-2 py-0.5 text-[11px] font-semibold text-red-600">
                            Closed
                          </span>
                        )}
                      </div>
                      <h3 className="mb-1 line-clamp-2 text-base font-bold text-gray-900 group-hover:text-[#E91E63]">
                        {itemTitle}
                      </h3>
                      {itemExcerpt && (
                        <p className="mb-3 line-clamp-2 text-sm text-gray-500">{itemExcerpt}</p>
                      )}
                      <div className="mt-auto flex items-center gap-2 text-xs text-gray-400">
                        {itemCountry && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {itemCountry}
                          </span>
                        )}
                        {item.application_deadline && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(item.application_deadline)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </PublicLayout>
  )
}
