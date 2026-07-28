# متطلبات استيراد ووردبريس

## حالة البيانات

لم يتم العثور على ملفات تصدير ووردبريس في `storage/app/import/wordpress/`.

## الملفات المطلوبة

لتشغيل عملية الاستيراد، ضع الملفات التالية في `storage/app/import/wordpress/`:

1. **WordPress XML export** (`.xml`) - تصدير XML من ووردبريس
2. **WordPress SQL dump** (`.sql`) - نسخة احتياطية من قاعدة البيانات
3. **uploads archive** (`.zip` أو `.tar.gz`) - مجلد wp-content/uploads

بدلاً من ذلك، يمكن استخدام WordPress REST API إذا كان الموقع القديم لا يزال متاحاً.

## أوامر الاستيراد المدعومة

```bash
php artisan wordpress:import --source=xml
php artisan wordpress:import --source=api
php artisan wordpress:import --dry-run
php artisan wordpress:import --only=pages
php artisan wordpress:import --only=posts
php artisan wordpress:import --only=media
php artisan wordpress:import --resume
```

## قائمة المحتوى المتوقع

بناءً على فئات الموقع المعروفة:
- منح دراسية (Scholarships)
- وظائف (Jobs)
- تدريب (Internships/Training)
- تأشيرات (Visas)
- برامج سفر (Travel Programmes)
- مؤتمرات (Conferences)
- مسابقات (Competitions)
- خدمات
- دورات
- صفحات ثابتة
