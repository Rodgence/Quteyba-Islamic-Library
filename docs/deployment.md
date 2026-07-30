# Production Deployment Guide

## Server Requirements

- PHP 8.3+
- MySQL 8.0+
- Node.js LTS
- Nginx
- Redis (optional)
- Supervisor
- SSL certificate

## Environment Setup

1. Clone repository
2. Copy `.env.example` to `.env` and configure: DB credentials, `APP_URL`, mail settings, etc.
3. Set `APP_ENV=production`, `APP_DEBUG=false`
4. Set the domain document root to the project's `public` directory whenever the hosting control panel allows it.

For shared Apache hosting where the domain document root must be the project directory,
the repository's root `.htaccess` securely rewrites requests into `public/` and redirects
direct `/public/...` browser requests to clean root-domain URLs.

## Deployment Commands

```bash
composer install --no-dev --optimize-autoloader
npm ci
npm run build
php artisan migrate --force
php artisan storage:link
php artisan optimize:clear
php artisan config:cache
php artisan event:cache
php artisan view:cache
php artisan db:seed --class=RoleSeeder
php artisan db:seed --class=UserSeeder
php artisan sitemap:generate
```

Route caching is intentionally omitted for this shared-host deployment. This
prevents an old `bootstrap/cache/routes-*.php` file from shadowing newly
deployed routes. If the server reports an incorrect HTTP method for an existing
route, run `php artisan route:clear` and restart PHP-FPM or clear OPcache from
the hosting control panel.

## Nginx Configuration

```nginx
server {
    listen 80;
    server_name example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name example.com;

    root /var/www/quteyba/public;
    index index.php;

    ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    # Static files
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri /index.php?$query_string;
    }

    # Inertia SSR proxy (if using SSR)
    location / {
        try_files $uri @ssr;
    }

    location @ssr {
        proxy_pass http://127.0.0.1:13714;
        proxy_http_version 1.1;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # PHP-FPM
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;
}
```

## Supervisor Configuration

```ini
[program:quteyba-queue]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/quteyba/artisan queue:work --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
stopwaitsecs=600
user=www-data
numprocs=2
redirect_stderr=true
stdout_logfile=/var/log/supervisor/quteyba-queue.log

[program:quteyba-ssr]
process_name=%(program_name)s_%(process_num)02d
command=node /var/www/quteyba/bootstrap/ssr/ssr.js
autostart=true
autorestart=true
user=www-data
numprocs=1
redirect_stderr=true
stdout_logfile=/var/log/supervisor/quteyba-ssr.log
environment=PORT="13714"
```

After adding configuration:

```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start quteyba-queue:* quteyba-ssr:*
```

## Cron Job

```
* * * * * cd /var/www/quteyba && php artisan schedule:run >> /dev/null 2>&1
```

## SSL Certificate

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d example.com
sudo certbot renew --dry-run
```

## Health Check

The application has a health endpoint at `/up`.

## Backup Procedure

```bash
# Backup database
mysqldump -u user -p quteyba > backup_$(date +%F).sql

# Backup storage directory
tar -czf storage_backup_$(date +%F).tar.gz storage/

# Backup .env
cp .env .env.backup_$(date +%F)
```

## Rollback Procedure

1. Restore database from backup: `mysql -u user -p quteyba < backup.sql`
2. Restore storage from backup: `tar -xzf storage_backup.tar.gz`
3. Switch symlink or `git checkout <previous-tag>` and re-run `php artisan optimize`

## Storage Permissions

```bash
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

## Post-Deployment Verification

- Visit homepage
- Test opportunity listing
- Test contact form
- Run `php artisan test`
- Check `https://domain/sitemap.xml`
