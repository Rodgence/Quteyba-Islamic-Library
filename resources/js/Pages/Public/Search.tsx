import { useState, FormEvent } from 'react'
import { router } from '@inertiajs/react'
import { Search as SearchIcon } from 'lucide-react'
import PublicLayout from '@/Layouts/PublicLayout'

interface SearchProps {
  seo?: Record<string, string>
}

export default function Search({ seo }: SearchProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    router.visit(`/opportunities?search=${encodeURIComponent(query.trim())}`)
  }

  return (
    <PublicLayout>
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="w-full max-w-2xl text-center">
          <div className="mb-8">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#073B33]">
              <SearchIcon className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-[#073B33]">بحث</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث عن فرصتك..."
                className="w-full rounded-2xl border-2 border-border bg-white py-5 ps-16 pe-6 text-lg text-[#101828] placeholder:text-[#101828]/35 shadow-sm transition-colors focus:border-[#073B33] focus:outline-none focus:ring-4 focus:ring-[#073B33]/10"
              />
              <button
                type="submit"
                className="absolute end-3 top-1/2 -translate-y-1/2 rounded-xl bg-[#073B33] p-3 text-white transition-colors hover:bg-[#052b26]"
                aria-label="بحث"
              >
                <SearchIcon className="h-6 w-6" />
              </button>
            </div>
          </form>

          <p className="mt-4 text-sm text-[#101828]/40">
            ابحث عن المنح الدراسية والوظائف والتدريب والمزيد
          </p>
        </div>
      </div>
    </PublicLayout>
  )
}
