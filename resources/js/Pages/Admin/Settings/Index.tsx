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
  general: 'عام',
  contact: 'معلومات الاتصال',
  social: 'وسائل التواصل',
  seo: 'تحسين محركات البحث',
  appearance: 'المظهر',
}

export default function SettingsIndex({ settings }: Props) {
  return (
    <AdminLayout>
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#073B33]">الإعدادات</h1>
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
                          defaultValue={setting.value}
                          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-[#073B33] focus:outline-none"
                          rows={2}
                          dir="auto"
                        />
                      ) : setting.type === 'boolean' ? (
                        <input
                          type="checkbox"
                          defaultChecked={setting.value === '1' || setting.value === 'true'}
                          className="h-4 w-4 rounded border-gray-300 text-[#073B33] focus:ring-[#073B33]"
                        />
                      ) : (
                        <input
                          type="text"
                          defaultValue={setting.value}
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
      </div>
    </AdminLayout>
  )
}
