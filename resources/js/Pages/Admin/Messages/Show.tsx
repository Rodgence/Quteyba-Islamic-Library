import { Link } from '@inertiajs/react'
import { ArrowLeft, Mail, Phone, Calendar, MailOpen, MapPin } from 'lucide-react'
import AdminLayout from '@/Layouts/AdminLayout'

interface Message {
  id: number
  name: string
  email: string
  phone: string | null
  country: string | null
  subject: string
  message: string
  is_read: boolean
  created_at: string
}

interface Props {
  message: Message
}

export default function MessagesShow({ message }: Props) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  return (
    <AdminLayout>
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <Link
            href="/admin/messages"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-[#073B33]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Messages
          </Link>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-100 px-6 py-4">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-xl font-bold text-[#073B33]">{message.subject}</h1>
              {message.is_read ? (
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500">
                  <MailOpen className="h-3.5 w-3.5" />
                  Read
                </span>
              ) : (
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#E91E63]/10 px-3 py-1 text-xs font-medium text-[#E91E63]">
                  <Mail className="h-3.5 w-3.5" />
                  Unread
                </span>
              )}
            </div>
          </div>

          <div className="grid gap-3 border-b border-gray-100 px-6 py-4 sm:grid-cols-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#073B33]/10">
                <span className="text-sm font-bold text-[#073B33]">
                  {message.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-400">Sender</p>
                <p className="text-sm font-medium text-gray-900">{message.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                <Mail className="h-4 w-4 text-gray-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Email</p>
                <p className="text-sm font-medium text-gray-900">{message.email}</p>
              </div>
            </div>

            {message.phone && (
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                  <Phone className="h-4 w-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Phone</p>
                  <p className="text-sm font-medium text-gray-900">{message.phone}</p>
                </div>
              </div>
            )}

            {message.country && (
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                  <MapPin className="h-4 w-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Country</p>
                  <p className="text-sm font-medium text-gray-900">{message.country}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                <Calendar className="h-4 w-4 text-gray-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Date Sent</p>
                <p className="text-sm font-medium text-gray-900">{formatDate(message.created_at)}</p>
              </div>
            </div>
          </div>

          <div className="px-6 py-4">
            <h2 className="mb-3 text-sm font-medium text-gray-500">Message</h2>
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
              {message.message}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
