import { Link } from '@inertiajs/react'
import { ChevronLeft, FileText } from 'lucide-react'
import PublicLayout from '@/Layouts/PublicLayout'
import type { Page } from '@/Types'

interface StaticPageProps {
  page: Page
  seo?: Record<string, string>
}

export default function StaticPage({ page, seo }: StaticPageProps) {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-4xl px-4 py-12">
        <nav className="mb-6 flex items-center gap-2 text-sm text-[#101828]/50">
          <Link href="/" className="hover:text-[#073B33] transition-colors">
            الرئيسية
          </Link>
          <ChevronLeft className="h-3 w-3" />
          <span className="text-[#073B33] font-medium">{page.title}</span>
        </nav>

        <article>
          <h1 className="mb-8 text-3xl font-bold text-[#073B33] leading-tight">{page.title}</h1>

          {page.content ? (
            <div
              className="prose prose-lg max-w-none leading-[1.9] text-[#101828]/80"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          ) : (
            <div className="rounded-2xl border border-border bg-white p-12 text-center">
              <FileText className="mx-auto mb-3 h-10 w-10 text-[#073B33]/20" />
              <p className="text-sm text-[#101828]/60">لا يوجد محتوى متاح حالياً.</p>
            </div>
          )}
        </article>
      </div>
    </PublicLayout>
  )
}
