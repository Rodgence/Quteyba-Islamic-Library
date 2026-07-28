import { Link, usePage, router } from '@inertiajs/react'
import { ArrowLeft, BookOpen, Clock, User, Globe, GraduationCap, DollarSign } from 'lucide-react'
import PublicLayout from '@/Layouts/PublicLayout'
import type { SharedProps } from '@/Types'

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
  course: CourseItem
  related: CourseItem[]
  seo?: SEO
}

function parseAr(value: string): string {
  try {
    const parsed = JSON.parse(value)
    return parsed?.ar || ''
  } catch {
    return value || ''
  }
}

const statusLabels: Record<string, string> = {
  open: 'التسجيل متاح',
  closed: 'التسجيل مغلق',
  soon: 'قريباً',
}

const infoItems = (course: CourseItem) => [
  { icon: Globe, label: 'اللغة', value: parseAr(course.language) },
  { icon: GraduationCap, label: 'المستوى', value: parseAr(course.level) },
  { icon: Clock, label: 'المدة', value: course.duration ? parseAr(course.duration) : '—' },
  { icon: BookOpen, label: 'طريقة التقديم', value: parseAr(course.delivery_method) },
  { icon: User, label: 'المدرس', value: course.instructor ? parseAr(course.instructor) : '—' },
  { icon: DollarSign, label: 'السعر', value: course.price !== null && course.price !== undefined ? `${course.price} ${course.price_currency || 'دولار'}` : 'مجاناً' },
]

export default function CourseDetailPage({ course, related }: Props) {
  const { locale } = usePage<SharedProps>().props

  function handleRegister() {
    router.post(`/courses/${course.slug}/register`)
  }

  return (
    <PublicLayout>
      <div className="bg-primary-light py-8">
        <div className="mx-auto max-w-7xl px-4">
          <nav className="mb-4 flex items-center gap-2 text-sm text-[#101828]/60">
            <Link href="/" className="hover:text-[#073B33]">الرئيسية</Link>
            <span>/</span>
            <Link href="/courses" className="hover:text-[#073B33]">الدورات</Link>
            <span>/</span>
            <span className="text-[#101828]">{parseAr(course.name)}</span>
          </nav>
          <h1 className="text-2xl font-bold text-[#073B33]">{parseAr(course.name)}</h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            {course.featured_image && (
              <img
                src={course.featured_image.url}
                alt={course.featured_image.alt_text || parseAr(course.name)}
                className="w-full rounded-2xl object-cover"
              />
            )}

            <div className="prose max-w-none text-sm leading-relaxed text-[#101828]/80">
              <div dangerouslySetInnerHTML={{ __html: parseAr(course.description) }} />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {infoItems(course).map((item, i) => (
                <div key={i} className="rounded-xl border border-border bg-white p-4">
                  <item.icon className="mb-2 h-5 w-5 text-[#E91E63]" />
                  <p className="text-xs text-[#101828]/50">{item.label}</p>
                  <p className="text-sm font-medium text-[#101828]">{item.value}</p>
                </div>
              ))}
            </div>

            <div>
              <button
                disabled={course.registration_status !== 'open'}
                onClick={handleRegister}
                className={`w-full rounded-xl px-4 py-3 text-sm font-semibold text-white transition-colors sm:w-auto sm:px-8 ${
                  course.registration_status === 'open'
                    ? 'bg-[#E91E63] hover:bg-[#c2185b] cursor-pointer'
                    : 'cursor-not-allowed bg-gray-400'
                }`}
              >
                {statusLabels[course.registration_status]}
              </button>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-2xl border border-border bg-white p-5">
                <h3 className="mb-4 text-sm font-semibold text-[#101828]">معلومات الدورة</h3>
                <div className="space-y-3 text-sm">
                  {infoItems(course).map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-[#101828]/60">{item.label}</span>
                      <span className="font-medium text-[#101828]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/courses"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-medium text-[#101828] transition-colors hover:bg-primary-light"
              >
                <ArrowLeft className="h-4 w-4" />
                جميع الدورات
              </Link>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-xl font-bold text-[#073B33]">دورات ذات صلة</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/courses/${item.slug}`}
                  className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-sm"
                >
                  {item.featured_image && (
                    <img
                      src={item.featured_image.url}
                      alt={item.featured_image.alt_text || parseAr(item.name)}
                      className="h-40 w-full object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="mb-1 text-sm font-semibold text-[#101828] line-clamp-1">
                      {parseAr(item.name)}
                    </h3>
                    <p className="text-xs text-[#101828]/50 line-clamp-2">
                      {parseAr(item.description)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </PublicLayout>
  )
}
