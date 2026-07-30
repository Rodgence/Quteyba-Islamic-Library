export interface User {
  id: number
  name: string
  email: string
  roles: string[]
  permissions: string[]
}

export interface Opportunity {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  opportunity_type: OpportunityType | null
  category: Category | null
  country: Country | null
  organization: string | null
  featured_image: Media | null
  funding_type: string | null
  education_level: string | null
  employment_type: string | null
  salary_amount: number | null
  salary_currency: string | null
  salary_period: string | null
  application_deadline: string | null
  application_url: string | null
  official_source_url: string | null
  benefits: string | null
  eligibility: string | null
  required_documents: string | null
  application_process: string | null
  important_notes: string | null
  status: 'draft' | 'scheduled' | 'published' | 'closed' | 'archived'
  is_featured: boolean
  published_at: string | null
  created_at: string
  updated_at: string
}

export interface OpportunityType {
  id: number
  name: string
  slug: string
  icon: string | null
}

export interface Category {
  id: number
  name: string
  slug: string
  description: string | null
}

export interface Country {
  id: number
  name: string
  slug: string
  code: string
  flag: string | null
}

export interface Service {
  id: number
  title: string
  slug: string
  introduction: string
  description: string
  deliverables: string | null
  required_documents: string | null
  process_steps: string | null
  price: number | null
  price_currency: string | null
  faq: string | null
  featured_image: Media | null
  status: 'draft' | 'published' | 'archived'
  created_at: string
  updated_at: string
}

export interface Course {
  id: number
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
  featured_image: Media | null
  status: 'draft' | 'published' | 'archived'
  created_at: string
  updated_at: string
}

export interface Page {
  id: number
  title: string
  slug: string
  content: string
  featured_image: Media | null
  status: 'draft' | 'published'
  seo_title: string | null
  seo_description: string | null
  created_at: string
  updated_at: string
}

export interface Media {
  id: number
  name: string
  file_name: string
  mime_type: string
  size: number
  url: string
  alt_text: string | null
  created_at: string
}

export interface Testimonial {
  id: number
  name: string
  position: string | null
  content: string
  avatar: Media | null
  is_active: boolean
  created_at: string
}

export interface SiteSetting {
  [key: string]: string | null
}

export interface Paginated<T> {
  data: T[]
  current_page: number
  last_page: number
  per_page: number
  total: number
  links: {
    url: string | null
    label: string
    active: boolean
  }[]
  from: number
  to: number
}

export interface SharedProps {
  auth: {
    user: User | null
  }
  locale: string
  flash: {
    success: string | null
    error: string | null
  }
  ziggy: Record<string, unknown>
}
