import { useForm } from '@inertiajs/react'
import AdminLayout from '@/Layouts/AdminLayout'

interface Setting {
  key: string
  value: string
  type: string
  label: string
}

interface SettingsGroup {
  [group: string]: Setting[]
}

interface Props {
  settings: SettingsGroup
}

const groupLabels: Record<string, string> = {
  general: 'General',
  contact: 'Contact Information',
  social: 'Social Media',
  seo: 'SEO',
  appearance: 'Appearance',
}

export default function SettingsIndex({ settings }: Props) {
  const initialValues = Object.values(settings)
    .flat()
    .reduce<Record<string, string>>((acc, setting) => {
      acc[setting.key] = setting.value
      return acc
    }, {})

  const { data, setData, put, processing, recentlySuccessful } = useForm({
    settings: initialValues,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    put('/admin/settings')
  }

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#073B33]">Settings</h1>
          <button
            type="submit"
            disabled={processing}
            className="rounded-xl bg-[#073B33] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#052b26] disabled:opacity-50"
          >
            {processing ? 'Saving...' : recentlySuccessful ? 'Saved' : 'Save Changes'}
          </button>
        </div>

        <div className="space-y-6">
          {Object.entries(settings).map(([group, items]) => (
            <div key={group} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
                <h2 className="text-sm font-medium text-[#073B33]">
                  {groupLabels[group] || group}
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                {items.map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between px-4 py-3">
                    <label className="text-sm font-medium text-gray-700">
                      {setting.label}
                    </label>
                    <div className="max-w-sm flex-1">
                      {setting.type === 'textarea' ? (
                        <textarea
                          value={data.settings[setting.key] ?? ''}
                          onChange={(e) => setData('settings', { ...data.settings, [setting.key]: e.target.value })}
                          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-[#073B33] focus:outline-none"
                          rows={2}
                          dir="auto"
                        />
                      ) : setting.type === 'boolean' ? (
                        <input
                          type="checkbox"
                          checked={data.settings[setting.key] === '1' || data.settings[setting.key] === 'true'}
                          onChange={(e) => setData('settings', { ...data.settings, [setting.key]: e.target.checked ? '1' : '0' })}
                          className="h-4 w-4 rounded border-gray-300 text-[#073B33] focus:ring-[#073B33]"
                        />
                      ) : (
                        <input
                          type="text"
                          value={data.settings[setting.key] ?? ''}
                          onChange={(e) => setData('settings', { ...data.settings, [setting.key]: e.target.value })}
                          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-[#073B33] focus:outline-none"
                          dir="auto"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </form>
    </AdminLayout>
  )
}
