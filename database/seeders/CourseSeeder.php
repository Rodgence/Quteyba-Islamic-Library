<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Course;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        $courses = [
            [
                'name' => json_encode(['ar' => 'اللغة العربية للمبتدئين']),
                'slug' => 'arabic-beginners',
                'description' => json_encode(['ar' => 'دورة شاملة لتعلم أساسيات اللغة العربية قراءة وكتابة ومحادثة.']),
                'language' => 'ar',
                'level' => 'beginner',
                'duration' => '3 أشهر',
                'delivery_method' => 'online',
                'instructor' => 'د. أحمد محمد',
                'price' => 150,
                'price_currency' => 'USD',
                'registration_status' => 'open',
                'status' => 'published',
            ],
            [
                'name' => json_encode(['ar' => 'اللغة الإنجليزية - المستوى المتوسط']),
                'slug' => 'english-intermediate',
                'description' => json_encode(['ar' => 'تطوير مهارات اللغة الإنجليزية للمستوى المتوسط مع التركيز على المحادثة.']),
                'language' => 'en',
                'level' => 'intermediate',
                'duration' => '4 أشهر',
                'delivery_method' => 'online',
                'instructor' => 'أ. سارة سميث',
                'price' => 200,
                'price_currency' => 'USD',
                'registration_status' => 'open',
                'status' => 'published',
            ],
            [
                'name' => json_encode(['ar' => 'اللغة الألمانية A1']),
                'slug' => 'german-a1',
                'description' => json_encode(['ar' => 'المستوى الأول في اللغة الألمانية حسب الإطار الأوروبي المرجعي.']),
                'language' => 'de',
                'level' => 'beginner',
                'duration' => '3 أشهر',
                'delivery_method' => 'online',
                'instructor' => 'أ. خالد العلي',
                'price' => 180,
                'price_currency' => 'USD',
                'registration_status' => 'open',
                'status' => 'published',
            ],
            [
                'name' => json_encode(['ar' => 'اللغة الفرنسية - محادثة']),
                'slug' => 'french-conversation',
                'description' => json_encode(['ar' => 'دورة محادثة باللغة الفرنسية لتحسين الطلاقة والنطق.']),
                'language' => 'fr',
                'level' => 'intermediate',
                'duration' => 'شهرين',
                'delivery_method' => 'online',
                'instructor' => 'أ. ليلى حسن',
                'price' => 120,
                'price_currency' => 'USD',
                'registration_status' => 'soon',
                'status' => 'published',
            ],
            [
                'name' => json_encode(['ar' => 'اللغة الإسبانية للمبتدئين']),
                'slug' => 'spanish-beginners',
                'description' => json_encode(['ar' => 'تعلم أساسيات اللغة الإسبانية من الصفر.']),
                'language' => 'es',
                'level' => 'beginner',
                'duration' => '3 أشهر',
                'delivery_method' => 'online',
                'price' => 160,
                'price_currency' => 'USD',
                'registration_status' => 'open',
                'status' => 'published',
            ],
            [
                'name' => json_encode(['ar' => 'اللغة اليابانية N5']),
                'slug' => 'japanese-n5',
                'description' => json_encode(['ar' => 'المستوى الأساسي في اللغة اليابانية استعداداً لاختبار JLPT N5.']),
                'language' => 'ja',
                'level' => 'beginner',
                'duration' => '6 أشهر',
                'delivery_method' => 'online',
                'price' => 300,
                'price_currency' => 'USD',
                'registration_status' => 'closed',
                'status' => 'published',
            ],
        ];

        foreach ($courses as $course) {
            Course::firstOrCreate(['slug' => $course['slug']], $course);
        }
    }
}
