import { useState } from 'react'
import { useForm } from '@inertiajs/react'

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
  })

  const [formError, setFormError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormError(null)
    post('/login', {
      onError: (errs) => {
        if (Object.keys(errs).length === 0) {
          setFormError('بيانات الدخول غير صحيحة')
        }
      },
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary-light px-4" dir="rtl" lang="ar">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-primary">مكتبة قتيبة الإسلامية</h1>
          <p className="mt-2 text-sm text-[#101828]/60">لوحة التحكم</p>
        </div>

        {formError && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#101828]">
              البريد الإلكتروني
            </label>
            <input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              className="w-full rounded-xl border border-border px-4 py-2.5 text-sm text-[#101828] placeholder:text-[#101828]/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="admin@qutayba.com"
              autoComplete="email"
              autoFocus
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-[#101828]">
              كلمة المرور
            </label>
            <input
              id="password"
              type="password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              className="w-full rounded-xl border border-border px-4 py-2.5 text-sm text-[#101828] placeholder:text-[#101828]/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="••••••••"
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              id="remember"
              type="checkbox"
              checked={data.remember}
              onChange={(e) => setData('remember', e.target.checked)}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
            />
            <label htmlFor="remember" className="text-sm text-[#101828]/70">
              تذكرني
            </label>
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {processing ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
          </button>
        </form>
      </div>
    </div>
  )
}
