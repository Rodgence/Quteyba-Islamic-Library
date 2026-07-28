# Quteyba Islamic Library — Architecture Overview

## 1. Project Overview

The Quteyba Islamic Library platform is undergoing a full rebuild from WordPress to a modern, high-performance stack. The greenfield application replaces the legacy WordPress CMS with a Laravel 13 monolith paired with a React + Inertia.js SPA frontend. The platform serves as a digital Islamic knowledge hub, publishing opportunities (grants, scholarships, competitions), courses, services, testimonials, and static content pages — all fully bilingual (Arabic/English) with RTL-first design.

**Core goals:**

- Modernize the entire codebase with type safety (TypeScript, PHP 8.3+) and strict schemas.
- Migrate all existing WordPress content (posts, pages, media, users, taxonomy) via automated Artisan commands.
- Deliver a mobile-first, SEO-optimised, performant reading experience for Arabic-language audiences.
- Provide role-based administration with granular permission control.
- Follow Laravel conventions, Inertia SSR, and modern React patterns.

---

## 2. Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Backend Framework | Laravel | 13.8 |
| Runtime | PHP | ^8.3 |
| Frontend Library | React | 19 |
| Frontend Type Safety | TypeScript | 7 |
| SPA Bridge | Inertia.js | 3.6 (Laravel + React) |
| CSS Framework | Tailwind CSS | 4.3 |
| Build Tool | Vite | 8 |
| Package Manager (JS) | npm | — |
| Relational Database | MySQL | 8.x+ |
| Auth & ACL | Spatie Laravel Permission | 8.3 |
| Sitemap Generator | Spatie Laravel Sitemap | 8.2 |
| JS Routing | Ziggy (tightenco/ziggy + ziggy-js) | 2.6 |
| UI Icons | Lucide React | 1.27 |
| Utility Library | clsx | 2.1 |
| Testing (PHP) | PHPUnit | 12.5 |
| Testing BDD Plugin | Laravel Pao (Pest) | 1.0 |
| Linting (PHP) | Laravel Pint | 1.27 |
| Dev Runner | concurrently | 9 |

---

## 3. Directory Structure

```
quteyba-islamic-library/
├── app/
│   ├── Console/
│   │   └── Commands/               # Artisan commands (import, utils)
│   │       └── Import/
│   │           ├── ImportMediaCommand.php
│   │           ├── ImportPagesCommand.php
│   │           ├── ImportPostsCommand.php
│   │           ├── ImportTaxonomyCommand.php
│   │           ├── ImportUsersCommand.php
│   │           └── ImportAllCommand.php
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Public/              # Public-facing Inertia controllers
│   │   │   │   ├── HomeController.php
│   │   │   │   ├── PageController.php
│   │   │   │   ├── OpportunityController.php
│   │   │   │   ├── CourseController.php
│   │   │   │   ├── ServiceController.php
│   │   │   │   ├── ContactController.php
│   │   │   │   └── SitemapController.php
│   │   │   └── Admin/               # Admin panel Inertia controllers
│   │   │       ├── DashboardController.php
│   │   │       ├── UserController.php
│   │   │       ├── RoleController.php
│   │   │       ├── PageController.php
│   │   │       ├── OpportunityController.php
│   │   │       ├── OpportunityTypeController.php
│   │   │       ├── CategoryController.php
│   │   │       ├── CourseController.php
│   │   │       ├── ServiceController.php
│   │   │       ├── TestimonialController.php
│   │   │       ├── MediaController.php
│   │   │       ├── MenuController.php
│   │   │       ├── RedirectController.php
│   │   │       ├── CountryController.php
│   │   │       └── ContactMessageController.php
│   │   ├── Middleware/
│   │   │   ├── HandleInertiaRequests.php  # Inertia shared data
│   │   │   ├── SetLocale.php              # Arabic/English detection
│   │   │   └── EnsureVerified.php         # Email verification guard
│   │   └── Requests/                # Form request validation classes
│   │       ├── Public/
│   │       └── Admin/
│   ├── Models/
│   │   ├── User.php
│   │   ├── Opportunity.php
│   │   ├── OpportunityType.php
│   │   ├── Category.php
│   │   ├── Country.php
│   │   ├── Service.php
│   │   ├── Course.php
│   │   ├── Page.php
│   │   ├── Testimonial.php
│   │   ├── Media.php
│   │   ├── Menu.php
│   │   ├── MenuItem.php
│   │   ├── Redirect.php
│   │   ├── ContactMessage.php
│   │   └── Slider.php
│   ├── Policies/
│   │   ├── OpportunityPolicy.php
│   │   ├── PagePolicy.php
│   │   ├── UserPolicy.php
│   │   ├── CoursePolicy.php
│   │   ├── ServicePolicy.php
│   │   ├── MediaPolicy.php
│   │   ├── MenuPolicy.php
│   │   └── RedirectPolicy.php
│   └── Services/
│       ├── WordPressImportService.php     # Core WXR/WP REST parser
│       ├── MediaProcessingService.php     # Image resize, WebP conversion
│       ├── SitemapService.php             # Sitemap generation logic
│       ├── SeoMetadataService.php         # Meta tags, structured data
│       └── RedirectService.php            # 301 redirect management
├── bootstrap/
│   └── app.php                            # Application bootstrap
├── config/
│   ├── app.php                            # App name, locale, timezone
│   ├── auth.php                           # Guard/password config
│   ├── database.php                       # MySQL connection
│   ├── filesystems.php                    # Local + cloud disks
│   ├── permission.php                     # Spatie permission models
│   ├── sitemap.php                        # Spatie sitemap config
│   ├── services.php                       # Third-party service keys
│   ├── cache.php, logging.php, mail.php,
│   │   queue.php, session.php
├── database/
│   ├── migrations/
│   │   ├── 0001_01_01_000000_create_users_table.php
│   │   ├── xxxx_create_permission_tables.php
│   │   ├── xxxx_create_categories_table.php
│   │   ├── xxxx_create_countries_table.php
│   │   ├── xxxx_create_opportunity_types_table.php
│   │   ├── xxxx_create_opportunities_table.php
│   │   ├── xxxx_create_services_table.php
│   │   ├── xxxx_create_courses_table.php
│   │   ├── xxxx_create_pages_table.php
│   │   ├── xxxx_create_testimonials_table.php
│   │   ├── xxxx_create_media_table.php
│   │   ├── xxxx_create_menus_table.php
│   │   ├── xxxx_create_menu_items_table.php
│   │   ├── xxxx_create_redirects_table.php
│   │   ├── xxxx_create_contact_messages_table.php
│   │   └── xxxx_create_sliders_table.php
│   └── seeders/
│       ├── DatabaseSeeder.php
│       ├── RoleSeeder.php
│       ├── UserSeeder.php
│       └── SampleDataSeeder.php
├── docs/
│   ├── architecture.md                    # This document
│   ├── wordpress-migration.md             # Import command details
│   ├── api.md                             # Internal API patterns
│   └── deployment.md                      # Production deployment guide
├── lang/
│   ├── en/                                # English translation strings
│   └── ar/                                # Arabic translation strings
├── public/
│   ├── index.php                          # Front controller
│   ├── storage/                           # Symlink to storage/app/public
│   └── uploads/                           # Drop-in for migrated images
├── resources/
│   ├── css/
│   │   └── app.css                        # Tailwind v4 entry: @import "tailwindcss";
│   ├── js/
│   │   ├── app.tsx                        # Inertia app bootstrap + resolve
│   │   ├── ssr.tsx                        # Inertia SSR server entry
│   │   ├── Components/
│   │   │   ├── Ui/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Badge.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   ├── Table.tsx
│   │   │   │   ├── Pagination.tsx
│   │   │   │   ├── Breadcrumbs.tsx
│   │   │   │   └── SeoHead.tsx
│   │   │   ├── Public/
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── OpportunityCard.tsx
│   │   │   │   ├── CourseCard.tsx
│   │   │   │   ├── ServiceCard.tsx
│   │   │   │   ├── TestimonialSlider.tsx
│   │   │   │   ├── ContactForm.tsx
│   │   │   │   └── SearchBar.tsx
│   │   │   ├── Admin/
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── Topbar.tsx
│   │   │   │   ├── DataTable.tsx
│   │   │   │   ├── RichEditor.tsx
│   │   │   │   ├── MediaPicker.tsx
│   │   │   │   ├── SeoFields.tsx
│   │   │   │   └── StatCard.tsx
│   │   │   └── Shared/
│   │   │       ├── Logo.tsx
│   │   │       ├── LanguageSwitcher.tsx
│   │   │       ├── StructuredData.tsx
│   │   │       └── Skeleton.tsx
│   │   ├── Hooks/
│   │   │   ├── useTranslation.ts
│   │   │   ├── useMediaQuery.ts
│   │   │   ├── useDebounce.ts
│   │   │   ├── usePagination.ts
│   │   │   └── useAuth.ts
│   │   ├── Layouts/
│   │   │   ├── PublicLayout.tsx            # Navbar + content + Footer
│   │   │   ├── AdminLayout.tsx             # Sidebar + topbar + content
│   │   │   └── AuthLayout.tsx              # Minimal login/register
│   │   ├── Lib/
│   │   │   ├── utils.ts                    # clsx wrappers, formatters
│   │   │   ├── api.ts                      # Axios/fetch helpers
│   │   │   ├── constants.ts                # App-wide constants
│   │   │   └── permissions.ts              # Client-side permission checks
│   │   ├── Pages/
│   │   │   ├── Public/
│   │   │   │   ├── Home.tsx
│   │   │   │   ├── Opportunities/
│   │   │   │   │   ├── Index.tsx
│   │   │   │   │   └── Show.tsx
│   │   │   │   ├── Courses/
│   │   │   │   │   ├── Index.tsx
│   │   │   │   │   └── Show.tsx
│   │   │   │   ├── Services/
│   │   │   │   │   ├── Index.tsx
│   │   │   │   │   └── Show.tsx
│   │   │   │   ├── Page.tsx               # Generic content page
│   │   │   │   ├── Contact.tsx
│   │   │   │   └── Search.tsx
│   │   │   ├── Admin/
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── Users/
│   │   │   │   ├── Roles/
│   │   │   │   ├── Pages/
│   │   │   │   ├── Opportunities/
│   │   │   │   ├── OpportunityTypes/
│   │   │   │   ├── Categories/
│   │   │   │   ├── Courses/
│   │   │   │   ├── Services/
│   │   │   │   ├── Testimonials/
│   │   │   │   ├── Media/
│   │   │   │   ├── Menus/
│   │   │   │   ├── Countries/
│   │   │   │   ├── Redirects/
│   │   │   │   ├── ContactMessages/
│   │   │   │   └── Settings.tsx
│   │   │   └── Auth/
│   │   │       ├── Login.tsx
│   │   │       ├── Register.tsx
│   │   │       ├── ForgotPassword.tsx
│   │   │       └── ResetPassword.tsx
│   │   └── Types/
│   │       ├── index.ts                   # Barrel re-exports
│   │       ├── models.ts                  # Eloquent model shapes
│   │       ├── page-props.ts              # Inertia shared props
│   │       ├── permissions.ts             # Permission enums
│   │       └── inertia.d.ts               # Global Inertia page type
│   └── views/
│       └── app.blade.php                  # Laravel shell: @inertia + @viteReactRefresh + @routes
├── routes/
│   ├── web.php                             # Public + auth + admin routes
│   ├── api.php                             # Optional API routes
│   └── console.php                         # Scheduled commands
├── storage/
│   ├── app/
│   │   ├── import/                         # WordPress WXR XML / JSON dumps
│   │   └── public/                         # Publicly accessible files (media)
│   ├── framework/                          # Laravel cache, views, sessions
│   └── logs/                               # Application logs
├── tests/
│   ├── Unit/
│   ├── Feature/
│   └── Pest.php                            # Pest configuration
├── .env
├── artisan
├── composer.json
├── package.json
├── vite.config.ts
├── tsconfig.json
└── tailwind.config.ts
```

---

## 4. Design System

### 4.1 Colour Palette

| Token | Hex | Usage |
|---|---|---|
| Primary | `#073B33` | Headings, nav, footer backgrounds, primary buttons, active states |
| Secondary | `#E91E63` | CTAs, highlights, accent links, badge backgrounds |
| Black | `#101828` | Body text, icons |
| White | `#FFFFFF` | Page backgrounds, card surfaces |

Neutral greys derive from `slate-*` Tailwind tokens where needed.

### 4.2 Typography

- **Primary font:** IBM Plex Sans Arabic (self-hosted via Bunny Fonts / local `@font-face` in `resources/css/app.css`).
- Fallback stack: `'IBM Plex Sans Arabic', 'Noto Naskh Arabic', Tahoma, sans-serif`.
- **Weights:** 400 (regular), 500 (medium), 600 (semibold).
- **Direction:** RTL by default (`dir="rtl"` on `<html>`). English pages override via `dir="ltr"` when locale is `en`.

### 4.3 Components & Styling Rules

- **No gradients** — all backgrounds, buttons, and surfaces are flat solid colours.
- **Solid buttons only** — no border-only ghost buttons for primary or secondary actions. Ghost outlines may be used sparingly for tertiary actions.
- **Card border-radius:** `12px`–`16px` (Tailwind `rounded-xl` to `rounded-2xl`).
- **Shadows:** Avoid excessive box-shadows. Use `shadow-sm` for subtle elevation on cards; omit shadows on mobile breakpoints entirely.
- **Animations:** Minimal. No hover scale transforms, no fade-in-on-scroll. Use `transition-colors duration-150` for interactive states only.
- **Mobile-first:** All components start at ≤375px viewport and scale up via `sm:`, `md:`, `lg:`, `xl:` breakpoints.
- **RTL-first:** Use logical properties (`start`/`end` instead of `left`/`right`) via Tailwind `ltr:*` / `rtl:*` modifiers where needed. All text aligns `text-start` or `text-end` according to locale.

### 4.4 Spacing & Layout

- Base rem size: 16px.
- Content max-width: `max-w-7xl` (1280px).
- Section vertical padding: `py-12` (mobile) → `py-16` (md+) → `py-20` (lg+).
- Admin sidebar width: 256px (collapsible to 64px).

---

## 5. Database Architecture

### 5.1 Entity Overview

| Table | Purpose | Key Columns |
|---|---|---|
| `users` | Authentication & authoring | `name`, `email`, `password`, `locale`, `avatar` |
| `roles` (Spatie) | Role definitions | `name`, `guard_name` |
| `permissions` (Spatie) | Granular permissions | `name`, `guard_name` |
| `opportunities` | Grants, scholarships, competitions | `title_ar`, `title_en`, `slug`, `body_ar`, `body_en`, `excerpt_ar`, `excerpt_en`, `deadline`, `country_id`, `category_id`, `type_id`, `featured_image_id`, `status`, `created_by` |
| `opportunity_types` | Categorisation of opportunities | `name_ar`, `name_en`, `slug` |
| `categories` | Hierarchical taxonomy (Nested Set) | `name_ar`, `name_en`, `slug`, `parent_id`, `_lft`, `_rgt` |
| `countries` | Country reference data | `name_ar`, `name_en`, `iso_code`, `flag` |
| `services` | Services offered by the library | `title_ar`, `title_en`, `slug`, `body_ar`, `body_en`, `icon`, `sort_order` |
| `courses` | Courses catalogue | `title_ar`, `title_en`, `slug`, `body_ar`, `body_en`, `instructor`, `duration`, `featured_image_id` |
| `pages` | Static content pages (About, FAQ, etc.) | `title_ar`, `title_en`, `slug`, `body_ar`, `body_en`, `status`, `meta_title`, `meta_description`, `created_by` |
| `testimonials` | User testimonials | `name_ar`, `name_en`, `body_ar`, `body_en`, `avatar`, `sort_order` |
| `media` | File library (polymorphic) | `filename`, `path`, `mime_type`, `size`, `alt_ar`, `alt_en`, `mediable_type`, `mediable_id` |
| `menus` | Menu definitions | `name`, `slug`, `location` (header, footer, sidebar) |
| `menu_items` | Menu item tree (Nested Set) | `menu_id`, `title_ar`, `title_en`, `url`, `route_name`, `target`, `_lft`, `_rgt` |
| `redirects` | 301 redirect rules | `from_path`, `to_path`, `status_code` (301 default) |
| `contact_messages` | Inbound contact form submissions | `name`, `email`, `phone`, `subject`, `message`, `is_read` |
| `sliders` | Hero/featured slider items | `title_ar`, `title_en`, `subtitle_ar`, `subtitle_en`, `image_id`, `link_url`, `sort_order` |
| `cache` | Laravel cache store (database driver default) | — |
| `jobs` | Laravel queue jobs | — |

### 5.2 Key Relationships

- **Opportunity** belongs to **Category** (M:1), **Country** (M:1), **OpportunityType** (M:1), **User** as creator (M:1).
- **Category** has a self-referencing parent relationship via Nested Set (`kalnoy/nestedset` or manual `_lft`/`_rgt`).
- **Menu** has many **MenuItems**, also Nested Set.
- **Media** uses polymorphic `mediable` (MorphTo) so any model can attach images/files.
- **Page**, **Course**, **Service**, **Opportunity** each morph to **Media**.

### 5.3 Indexing Strategy

- Primary keys: auto-incrementing `BIGINT`.
- Foreign keys: all indexed.
- `slug` columns: unique index.
- Full-text search: MySQL `FULLTEXT` index on `title_ar`, `title_en`, `body_ar`, `body_en` for opportunities, courses, services, and pages.
- `status` columns: indexed for scope filtering.
- `deadline` on opportunities: indexed for date-range queries.
- Polymorphic `mediable_type` + `mediable_id`: composite index.

---

## 6. Authentication & Authorization

### 6.1 Authentication

Laravel's built-in session-based authentication with Inertia SSR-compatible CSRF protection. Login, registration, password reset, and email verification flows are rendered via Inertia pages under `resources/js/Pages/Auth/`.

- Guard: `web` (session).
- Provider: `users` table.
- Password hashing: bcrypt (Laravel default).
- Remember-me tokens supported.

### 6.2 Roles

Three core roles defined via Spatie Laravel Permission:

| Role | Description |
|---|---|
| **Super Admin** | Full system access. Bypasses all policy checks via `Gate::before`. Manages users, roles, and system settings. |
| **Administrator** | Manages content (pages, opportunities, courses, etc.), media, menus, and redirects. Cannot alter user roles or system config. |
| **Editor** | Create and edit own content. Cannot publish or delete content created by others. Cannot access media library management or menus. |

Roles are seeded via `RoleSeeder` and assigned through the admin panel or `artisan` commands.

### 6.3 Authorization (Policies)

Every model with CRUD operations has a corresponding Laravel policy class in `app/Policies/`. Policies gate:

- `viewAny`, `view` — read access.
- `create` — who can create new records.
- `update`, `delete`, `restore`, `forceDelete` — write/destroy access.

Policies are registered in `AuthServiceProvider`. The `Gate::before` callback grants Super Admin full pass-through.

Frontend permission checks use the `$page.props.auth.can` Inertia shared prop (see Inertia middleware) and a client-side `permissions.ts` helper.

---

## 7. WordPress Migration System

Legacy content from the existing WordPress installation is imported via one-shot Artisan commands. The commands are idempotent — they skip records that already exist (matched by legacy ID or slug) so they can be re-run safely.

### 7.1 Command Architecture

```
app/Console/Commands/Import/
├── ImportAllCommand.php          # Orchestrator: runs all import commands in order
├── ImportUsersCommand.php        # wp_users → users table
├── ImportTaxonomyCommand.php     # wp_terms → categories, opportunity_types
├── ImportMediaCommand.php        # wp_posts (attachment) → media table + filesystem
├── ImportPostsCommand.php        # wp_posts → opportunities, courses, services
├── ImportPagesCommand.php        # wp_posts (page) → pages table
```

### 7.2 Import Flow

1. Export WordPress data as WXR XML or connect directly to the WP database via a secondary MySQL connection.
2. Place WXR files in `storage/app/import/`.
3. Run `php artisan import:all` which:
   - Creates system roles and permissions.
   - Imports users and maps them to the default Editor role.
   - Imports categories and taxonomies as Nested Set hierarchies.
   - Downloads and imports media attachments; converts to WebP.
   - Imports posts/pages, maps their content (HTML → Markdown or clean HTML), assigns categories and featured images.
   - Creates 301 redirects for any slug changes from the old WP permalink structure.
   - Generates initial sitemap.

### 7.3 `WordPressImportService`

A service class in `app/Services/WordPressImportService.php` encapsulates the parsing logic:

- `parseWXR(string $filePath): array` — parses WXR XML into structured arrays.
- `parseWpDatabase(string $connection): array` — reads directly from a WP MySQL database.
- Strips WordPress shortcodes.
- Converts `<!-- wp:... -->` block comments to clean HTML or plain text.
- Maps WP user roles (administrator → Super Admin, editor → Administrator, author → Editor).

---

## 8. SEO Strategy

### 8.1 Inertia SSR

Server-side rendering is enabled for all public Inertia pages. A Node.js SSR server compiles and runs `resources/js/ssr.tsx`, returning fully rendered HTML to crawlers and first-visit users. This eliminates the blank-page problem for search engines and social media crawlers.

### 8.2 Meta Tags & Structured Data

- Every Inertia page passes a `meta` prop: `{ title, description, og_image, canonical_url }`.
- The `SeoHead` component renders `<title>`, `<meta name="description">`, Open Graph tags, Twitter Card tags, `<link rel="canonical">`, and `<link rel="alternate" hreflang="ar|en">`.
- A `StructuredData` component renders JSON-LD `<script type="application/ld+json">` blocks for `WebSite`, `Organization`, `WebPage`, `Article` (opportunities/courses), `BreadcrumbList`, and `FAQ` (for FAQ pages).
- `SeoMetadataService` generates structured data arrays server-side.

### 8.3 Sitemap

Spatie Laravel Sitemap generates a dynamic `/sitemap.xml` with:

- All published pages, opportunities, courses, services.
- `lastmod`, `changefreq`, and `priority` per entry.
- Alternating `<xhtml:link rel="alternate" hreflang="..."/>` for Arabic and English URLs.
- Sitemap index if entry count exceeds 50,000.

### 8.4 Redirects

The `redirects` table stores 301 redirects. A middleware checks every incoming request against this table and issues a permanent redirect if a match is found. This preserves SEO equity from the old WordPress URL structure.

### 8.5 Canonical URLs

Ziggy generates named route URLs. Canonical paths always default to the Arabic slug (primary locale). English pages append `/en/` prefix: `domain.com/ar/page-slug` and `domain.com/en/page-slug`. The canonical URL is set to the current locale's full path.

---

## 9. Performance Strategy

### 9.1 Image Optimisation

- All uploaded and imported images are converted to **WebP** format (fallback: optimised JPEG).
- Responsive image variants generated at breakpoint widths: 400, 800, 1200, 1600px.
- Lazy loading via native `loading="lazy"` on `<img>` tags below the fold.
- Blurhash placeholders for a perceived performance boost.
- `MediaProcessingService` handles conversion and resizing on upload/import.

### 9.2 Caching

- Laravel route caching (`php artisan route:cache`).
- Config caching (`php artisan config:cache`).
- View/SSR output caching via Laravel's cache driver for expensive pages (homepage, heavy listing pages).
- Inertia partial reloads and lazy data evaluation (`Inertia::lazy()`) to defer non-critical data.
- HTTP cache headers (`Cache-Control`, `ETag`) for static assets served through Vite.

### 9.3 Database

- Eager loading of relationships in controllers via `with()` to avoid N+1 queries.
- Pagination: 12–24 items per page, rendered with cursor or offset pagination.
- `FULLTEXT` indexes for Arabic/English search queries.
- Query caching for reference data (categories, countries) with cache invalidation on update.

### 9.4 Frontend

- Code splitting via Vite: Inertia page components are dynamically imported.
- React `lazy()` + `Suspense` for non-critical below-fold components.
- `useDebounce` for search inputs to limit API calls.
- Tailwind v4's JIT compiler eliminates unused CSS — no purging config needed.

---

## 10. Security

### 10.1 CSRF Protection

Laravel's VerifyCsrfToken middleware protects all `POST`, `PUT`, `PATCH`, `DELETE` routes. Inertia.js automatically includes the `XSRF-TOKEN` header on every request via Axios, sourced from the `XSRF-TOKEN` cookie set by Laravel.

### 10.2 Input Validation & Sanitisation

- All incoming requests pass through Form Request validation classes (`app/Http/Requests/`).
- HTML content from rich editors is sanitised via `strip_tags()` with an allowed-tags whitelist before storage.
- Output is auto-escaped by React (XSS prevention). Raw HTML from the CMS editor is rendered via `dangerouslySetInnerHTML` only after server-side sanitisation.

### 10.3 Rate Limiting

Laravel's `ThrottleRequests` middleware is applied to:

- Login attempts (5 per minute per IP).
- Contact form submissions (3 per hour per IP).
- API/search endpoints (60 per minute per IP).

### 10.4 Authorization Enforcement

All controller actions call `$this->authorize()` or use policy middleware. Blade/Inertia shared data excludes sensitive fields based on the authenticated user's permissions.

### 10.5 Additional Measures

- `.env` never committed; production secrets injected via environment.
- Database credentials use least-privilege MySQL user (SELECT/INSERT/UPDATE/DELETE only; no DDL in production runtime).
- HTTPS enforced via HSTS headers; all cookies set `Secure` + `SameSite=Lax`.
- Laravel's `AppServiceProvider` boot method sets `Model::shouldBeStrict()` in non-production to catch lazy loading, missing fillable attributes, etc.
- File upload validation restricts MIME types and enforces a maximum file size (10 MB).
- Admin routes are grouped under `auth` + `verified` + `role` middleware.
