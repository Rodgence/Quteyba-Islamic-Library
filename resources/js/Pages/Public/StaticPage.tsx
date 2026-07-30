import { Link } from '@inertiajs/react'
import { ChevronRight, FileText } from 'lucide-react'
import PublicLayout from '@/Layouts/PublicLayout'
import type { Page } from '@/Types'
import { getLocalized } from '@/lib/localization'

interface StaticPageProps {
  page: Page
  seo?: Record<string, string>
}

export default function StaticPage({ page, seo }: StaticPageProps) {
  const title = getLocalized(page.title)
  const content = getLocalized(page.content)

  return (
    <PublicLayout>
      <div className="mx-auto max-w-4xl px-4 py-12">
        <nav className="mb-6 flex items-center gap-2 text-sm text-[#101828]/50">
          <Link href="/" className="hover:text-[#073B33] transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[#073B33] font-medium">{title}</span>
        </nav>

        <article>
          <h1 className="mb-8 text-3xl font-bold text-[#073B33] leading-tight">{title}</h1>

          {content ? (
            <div
              className="prose prose-lg max-w-none leading-[1.9] text-[#101828]/80"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <div className="rounded-2xl border border-border bg-white p-12 text-center">
              <FileText className="mx-auto mb-3 h-10 w-10 text-[#073B33]/20" />
              <p className="text-sm text-[#101828]/60">No content available at this time.</p>
            </div>
          )}
        </article>
      </div>
    </PublicLayout>
  )
}
