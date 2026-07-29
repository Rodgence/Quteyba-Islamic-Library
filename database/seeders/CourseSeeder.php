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
                'name' => json_encode(['en' => 'Arabic for Beginners']),
                'slug' => 'arabic-beginners',
                'description' => json_encode(['en' => 'A comprehensive course to learn the basics of the Arabic language: reading, writing, and conversation.']),
                'language' => 'ar',
                'level' => 'beginner',
                'duration' => '3 months',
                'delivery_method' => 'online',
                'instructor' => 'Dr. Ahmed Mohamed',
                'price' => 150,
                'price_currency' => 'USD',
                'registration_status' => 'open',
                'status' => 'published',
            ],
            [
                'name' => json_encode(['en' => 'English - Intermediate Level']),
                'slug' => 'english-intermediate',
                'description' => json_encode(['en' => 'Developing intermediate-level English skills with a focus on conversation.']),
                'language' => 'en',
                'level' => 'intermediate',
                'duration' => '4 months',
                'delivery_method' => 'online',
                'instructor' => 'Ms. Sarah Smith',
                'price' => 200,
                'price_currency' => 'USD',
                'registration_status' => 'open',
                'status' => 'published',
            ],
            [
                'name' => json_encode(['en' => 'German A1']),
                'slug' => 'german-a1',
                'description' => json_encode(['en' => 'The first level in German according to the Common European Framework of Reference.']),
                'language' => 'de',
                'level' => 'beginner',
                'duration' => '3 months',
                'delivery_method' => 'online',
                'instructor' => 'Mr. Khalid Al-Ali',
                'price' => 180,
                'price_currency' => 'USD',
                'registration_status' => 'open',
                'status' => 'published',
            ],
            [
                'name' => json_encode(['en' => 'French - Conversation']),
                'slug' => 'french-conversation',
                'description' => json_encode(['en' => 'A French conversation course to improve fluency and pronunciation.']),
                'language' => 'fr',
                'level' => 'intermediate',
                'duration' => '2 months',
                'delivery_method' => 'online',
                'instructor' => 'Ms. Layla Hassan',
                'price' => 120,
                'price_currency' => 'USD',
                'registration_status' => 'soon',
                'status' => 'published',
            ],
            [
                'name' => json_encode(['en' => 'Spanish for Beginners']),
                'slug' => 'spanish-beginners',
                'description' => json_encode(['en' => 'Learn the basics of Spanish from scratch.']),
                'language' => 'es',
                'level' => 'beginner',
                'duration' => '3 months',
                'delivery_method' => 'online',
                'price' => 160,
                'price_currency' => 'USD',
                'registration_status' => 'open',
                'status' => 'published',
            ],
            [
                'name' => json_encode(['en' => 'Japanese N5']),
                'slug' => 'japanese-n5',
                'description' => json_encode(['en' => 'The basic level in Japanese in preparation for the JLPT N5 test.']),
                'language' => 'ja',
                'level' => 'beginner',
                'duration' => '6 months',
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
