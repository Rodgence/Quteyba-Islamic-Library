import AdminLayout from '@/Layouts/AdminLayout'

interface Role {
  name: string
}

interface User {
  id: number
  name: string
  email: string
  roles: Role[]
  created_at: string
}

interface Props {
  users: { data: User[] }
}

const roleColors: Record<string, string> = {
  admin: 'bg-red-100 text-red-700',
  editor: 'bg-blue-100 text-blue-700',
  moderator: 'bg-purple-100 text-purple-700',
}

export default function UsersIndex({ users }: Props) {
  const items = (users as any).data || users

  return (
    <AdminLayout>
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#073B33]">Users</h1>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left">
                <th className="px-4 py-3 font-medium text-gray-600">Name</th>
                <th className="px-4 py-3 font-medium text-gray-600">Email</th>
                <th className="px-4 py-3 font-medium text-gray-600">Roles</th>
                <th className="px-4 py-3 font-medium text-gray-600">Registered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {Array.isArray(items) && items.map((user: User) => (
                <tr key={user.id} className="transition-colors hover:bg-gray-50/50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-4 py-3 text-gray-500" dir="ltr">
                    {user.email}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {user.roles.map((role) => (
                        <span
                          key={role.name}
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${roleColors[role.name] || 'bg-gray-100 text-gray-600'}`}
                        >
                          {role.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500" dir="ltr">
                    {new Date(user.created_at).toLocaleDateString('en-US')}
                  </td>
                </tr>
              ))}
              {(!Array.isArray(items) || items.length === 0) && (
                <tr>
                  <td className="px-4 py-8 text-center text-gray-400" colSpan={4}>
                    No users yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
