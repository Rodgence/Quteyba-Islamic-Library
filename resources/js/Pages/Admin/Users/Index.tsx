import { useState } from 'react'
import { useForm, router, usePage } from '@inertiajs/react'
import { Trash2, Pencil, Plus, X, Check } from 'lucide-react'
import AdminLayout from '@/Layouts/AdminLayout'
import type { SharedProps } from '@/Types'

interface Role {
  id: number
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
  roles: Role[]
}

const roleColors: Record<string, string> = {
  'Super Admin': 'bg-red-100 text-red-700',
  Administrator: 'bg-blue-100 text-blue-700',
  Editor: 'bg-purple-100 text-purple-700',
}

export default function UsersIndex({ users, roles }: Props) {
  const { auth } = usePage<SharedProps>().props
  const items = (users as any).data || users
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  const { data, setData, post, processing, reset, errors } = useForm({
    name: '',
    email: '',
    password: '',
    roles: [] as string[],
  })

  const {
    data: editData,
    setData: setEditData,
    put,
    processing: editProcessing,
    errors: editErrors,
    reset: editReset,
  } = useForm({
    name: '',
    email: '',
    password: '',
    roles: [] as string[],
  })

  const toggleRole = (list: string[], setList: (roles: string[]) => void, roleName: string) => {
    setList(list.includes(roleName) ? list.filter((r) => r !== roleName) : [...list, roleName])
  }

  const handleAdd = () => {
    post('/admin/users', {
      onSuccess: () => {
        reset()
        setAdding(false)
      },
    })
  }

  const startEdit = (user: User) => {
    setEditingId(user.id)
    setEditData({
      name: user.name,
      email: user.email,
      password: '',
      roles: user.roles.map((r) => r.name),
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    editReset()
  }

  const handleUpdate = (id: number) => {
    put(`/admin/users/${id}`, {
      onSuccess: () => {
        setEditingId(null)
        editReset()
      },
    })
  }

  const handleDelete = (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    router.delete(`/admin/users/${id}`)
  }

  return (
    <AdminLayout>
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#073B33]">Users</h1>
          {!adding && (
            <button
              onClick={() => setAdding(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#073B33] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#052b26]"
            >
              <Plus className="h-4 w-4" />
              Add User
            </button>
          )}
        </div>

        {adding && (
          <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-[#073B33] focus:outline-none"
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  dir="ltr"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-[#073B33] focus:outline-none"
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  dir="ltr"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-[#073B33] focus:outline-none"
                />
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
              </div>
            </div>
            <div className="mt-3">
              <label className="mb-1 block text-sm font-medium text-gray-700">Roles</label>
              <div className="flex flex-wrap gap-3">
                {roles.map((role) => (
                  <label key={role.id} className="flex items-center gap-1.5 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={data.roles.includes(role.name)}
                      onChange={() => toggleRole(data.roles, (r) => setData('roles', r), role.name)}
                      className="h-4 w-4 rounded border-gray-300 text-[#073B33] focus:ring-[#073B33]"
                    />
                    {role.name}
                  </label>
                ))}
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={handleAdd}
                disabled={processing}
                className="inline-flex items-center gap-1 rounded-xl bg-[#073B33] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#052b26] disabled:opacity-50"
              >
                <Check className="h-4 w-4" />
                Save
              </button>
              <button
                onClick={() => {
                  setAdding(false)
                  reset()
                }}
                className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left">
                <th className="px-4 py-3 font-medium text-gray-600">Name</th>
                <th className="px-4 py-3 font-medium text-gray-600">Email</th>
                <th className="px-4 py-3 font-medium text-gray-600">Roles</th>
                <th className="px-4 py-3 font-medium text-gray-600">Registered</th>
                <th className="px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {Array.isArray(items) && items.map((user: User) => (
                <tr key={user.id} className="transition-colors hover:bg-gray-50/50">
                  {editingId === user.id ? (
                    <td className="px-4 py-3" colSpan={5}>
                      <div className="grid gap-3 sm:grid-cols-3">
                        <div>
                          <label className="mb-1 block text-xs font-medium text-gray-500">Name</label>
                          <input
                            type="text"
                            value={editData.name}
                            onChange={(e) => setEditData('name', e.target.value)}
                            className="w-full rounded-xl border border-gray-200 px-2 py-1.5 text-sm focus:border-[#073B33] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-medium text-gray-500">Email</label>
                          <input
                            type="email"
                            value={editData.email}
                            onChange={(e) => setEditData('email', e.target.value)}
                            dir="ltr"
                            className="w-full rounded-xl border border-gray-200 px-2 py-1.5 text-sm focus:border-[#073B33] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-medium text-gray-500">New Password (optional)</label>
                          <input
                            type="password"
                            value={editData.password}
                            onChange={(e) => setEditData('password', e.target.value)}
                            dir="ltr"
                            placeholder="Leave blank to keep current"
                            className="w-full rounded-xl border border-gray-200 px-2 py-1.5 text-sm focus:border-[#073B33] focus:outline-none"
                          />
                        </div>
                      </div>
                      <div className="mt-3">
                        <label className="mb-1 block text-xs font-medium text-gray-500">Roles</label>
                        <div className="flex flex-wrap gap-3">
                          {roles.map((role) => (
                            <label key={role.id} className="flex items-center gap-1.5 text-sm text-gray-700">
                              <input
                                type="checkbox"
                                checked={editData.roles.includes(role.name)}
                                onChange={() => toggleRole(editData.roles, (r) => setEditData('roles', r), role.name)}
                                className="h-4 w-4 rounded border-gray-300 text-[#073B33] focus:ring-[#073B33]"
                              />
                              {role.name}
                            </label>
                          ))}
                        </div>
                      </div>
                      {(editErrors.name || editErrors.email || editErrors.password) && (
                        <p className="mt-2 text-xs text-red-500">
                          {editErrors.name || editErrors.email || editErrors.password}
                        </p>
                      )}
                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => handleUpdate(user.id)}
                          disabled={editProcessing}
                          className="inline-flex items-center gap-1 rounded-xl bg-[#073B33] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#052b26] disabled:opacity-50"
                        >
                          <Check className="h-3 w-3" />
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="inline-flex items-center gap-1 rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
                        >
                          <X className="h-3 w-3" />
                          Cancel
                        </button>
                      </div>
                    </td>
                  ) : (
                    <>
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
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => startEdit(user)}
                            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-[#073B33]"
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          {auth.user?.id !== user.id && (
                            <button
                              onClick={() => handleDelete(user.id)}
                              className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {(!Array.isArray(items) || items.length === 0) && (
                <tr>
                  <td className="px-4 py-8 text-center text-gray-400" colSpan={5}>
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
