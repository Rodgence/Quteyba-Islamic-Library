import { Link } from '@inertiajs/react'
import { BookOpen, Clock, User } from 'lucide-react'
import PublicLayout from '@/Layouts/PublicLayout'
import { getLocalized } from '@/lib/localization'

interface CourseItem {
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
  featured_image: { url: string; alt_text?: string } | null
}

interface SEO {
  title?: string
  description?: string
}

interface Props {
  courses: CourseItem[]
  seo?: SEO
}

const statusLabels: Record<string, string> = {
  open: 'Open',
  closed: 'Closed',
  soon: 'Coming Soon',
}

const statusStyles: Record<string, string> = {
  open: 'bg-[#073B33]/10 text-[#073B33]',
  closed: 'bg-[#E91E63]/10 text-[#E91E63]',
  soon: 'bg-amber-50 text-amber-700',
}

export default function CoursesPage({ courses }: Props) {
  return (
    <PublicLayout>
      <div className="bg-primary-light py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-2xl font-bold text-[#073B33]">Courses</h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.slug}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-sm"
            >
              {course.featured_image && (
                <div className="relative">
                  <img
                    src={course.featured_image.url}
                    alt={course.featured_image.alt_text || getLocalized(course.name)}
                    className="h-48 w-full object-cover"
                  />
                  <span
                    className={`absolute left-3 top-3 rounded-lg px-2.5 py-1 text-xs font-semibold ${statusStyles[course.registration_status]}`}
                  >
                    {statusLabels[course.registration_status]}
                  </span>
                </div>
              )}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="mb-2 text-lg font-semibold text-[#101828]">
                  {getLocalized(course.name)}
                </h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-[#101828]/60 line-clamp-2">
                  {getLocalized(course.description)}
                </p>
                <div className="mb-4 space-y-1.5 text-xs text-[#101828]/50">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>{getLocalized(course.language)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{getLocalized(course.level)} · {course.duration ? getLocalized(course.duration) : '—'}</span>
                  </div>
                  {course.instructor && (
                    <div className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" />
                      <span>{getLocalized(course.instructor)}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#073B33]">
                    {course.price !== null && course.price !== undefined
                      ? `${course.price} ${course.price_currency || 'USD'}`
                      : 'Free'}
                  </span>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="rounded-xl bg-[#E91E63] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#c2185b]"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PublicLayout>
  )
}
