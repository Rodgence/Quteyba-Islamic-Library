# WordPress Import Requirements

## Data Status

No WordPress export files were found in `storage/app/import/wordpress/`.

## Required Files

To run the import process, place the following files in `storage/app/import/wordpress/`:

1. **WordPress XML export** (`.xml`) - XML export from WordPress
2. **WordPress SQL dump** (`.sql`) - Database backup
3. **uploads archive** (`.zip` or `.tar.gz`) - the wp-content/uploads folder

Alternatively, the WordPress REST API can be used if the old site is still available.

## Supported Import Commands

```bash
php artisan wordpress:import --source=xml
php artisan wordpress:import --source=api
php artisan wordpress:import --dry-run
php artisan wordpress:import --only=pages
php artisan wordpress:import --only=posts
php artisan wordpress:import --only=media
php artisan wordpress:import --resume
```

## Expected Content List

Based on the site's known categories:
- Scholarships
- Jobs
- Internships/Training
- Visas
- Travel Programmes
- Conferences
- Competitions
- Services
- Courses
- Static pages
