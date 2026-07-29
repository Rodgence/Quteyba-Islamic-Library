import { useState } from 'react'
import { Link, router } from '@inertiajs/react'
import { Eye, Mail, MailOpen } from 'lucide-react'
import AdminLayout from '@/Layouts/AdminLayout'

interface Message {
  id: number
  name: string
  email: string
  subject: string
  created_at: string
  is_read: boolean
}

interface FiltersData {
  status?: string
}

interface Props {
  messages: {
    data: Message[]
    current_page: number
    last_page: number
    per_page: number
    total: number
    links: { url: string | null; label: string; active: boolean }[]
  }
  filters: FiltersData
  unreadCount: number
}

export default function MessagesIndex({ messages, filters, unreadCount }: Props) {
  const [activeFilter, setActiveFilter] = useState(filters.status || 'all')

  const applyFilter = (status: string) => {
    setActiveFilter(status)
    router.get(
      '/admin/messages',
      status !== 'all' ? { status } : {},
      { preserveState: true, replace: true }
    )
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  return (
    <AdminLayout>
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-[#073B33]">Messages</h1>
            {unreadCount > 0 && (
              <span className="inline-flex items-center rounded-full bg-[#E91E63] px-2.5 py-0.5 text-xs font-bold text-white">
                {unreadCount}
              </span>
            )}
          </div>
        </div>

        <div className="mb-4 flex gap-2">
          <button
            onClick={() => applyFilter('all')}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              activeFilter === 'all'
                ? 'bg-[#073B33] text-white'
                : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            All
          </button>
          <button
            onClick={() => applyFilter('unread')}
            className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              activeFilter === 'unread'
                ? 'bg-[#073B33] text-white'
                : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Mail className="h-3.5 w-3.5" />
            Unread
          </button>
          <button
            onClick={() => applyFilter('read')}
            className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              activeFilter === 'read'
                ? 'bg-[#073B33] text-white'
                : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <MailOpen className="h-3.5 w-3.5" />
            Read
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left">
                <th className="px-4 py-3 font-medium text-gray-600">Name</th>
                <th className="px-4 py-3 font-medium text-gray-600">Email</th>
                <th className="px-4 py-3 font-medium text-gray-600">Subject</th>
                <th className="px-4 py-3 font-medium text-gray-600">Date</th>
                <th className="px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {messages.data.map((message) => (
                <tr
                  key={message.id}
                  className={`transition-colors hover:bg-gray-50/50 ${!message.is_read ? 'bg-[#E91E63]/[0.02]' : ''}`}
                >
                  <td className="px-4 py-3">
                    <span className={`font-medium ${!message.is_read ? 'text-gray-900' : 'text-gray-700'}`}>
                      {message.name}
                    </span>
                    {!message.is_read && (
                      <span className="ml-1.5 inline-block h-2 w-2 rounded-full bg-[#E91E63]" />
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-500">{message.email}</td>
                  <td className="px-4 py-3 text-gray-500">{message.subject}</td>
                  <td className="px-4 py-3 text-gray-400">{formatDate(message.created_at)}</td>
                  <td className="px-4 py-3">
                    {message.is_read ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                        <MailOpen className="h-3 w-3" />
                        Read
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#E91E63]/10 px-2 py-0.5 text-xs font-medium text-[#E91E63]">
                        <Mail className="h-3 w-3" />
                        Unread
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/messages/${message.id}`}
                      className="inline-flex items-center gap-1 rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-[#073B33]"
                      title="View"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))}
              {messages.data.length === 0 && (
                <tr>
                  <td className="px-4 py-8 text-center text-gray-400" colSpan={6}>
                    No messages
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {messages.last_page > 1 && (
          <div className="mt-4 flex items-center justify-center gap-1">
            {messages.links
              .filter((link) => link.url !== null)
              .map((link, i) => (
                <button
                  key={i}
                  onClick={() => router.get(link.url!, {}, { preserveState: true })}
                  disabled={link.active}
                  className={`rounded-xl px-3 py-1.5 text-sm font-medium transition-colors ${
                    link.active
                      ? 'bg-[#073B33] text-white'
                      : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
