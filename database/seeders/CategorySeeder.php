<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => json_encode(['ar' => 'بكالوريوس']), 'slug' => 'bachelor', 'parent_id' => null],
            ['name' => json_encode(['ar' => 'ماجستير']), 'slug' => 'master', 'parent_id' => null],
            ['name' => json_encode(['ar' => 'دكتوراه']), 'slug' => 'phd', 'parent_id' => null],
            ['name' => json_encode(['ar' => 'لغات']), 'slug' => 'languages', 'parent_id' => null],
            ['name' => json_encode(['ar' => 'الهندسة']), 'slug' => 'engineering', 'parent_id' => null],
            ['name' => json_encode(['ar' => 'الطب']), 'slug' => 'medicine', 'parent_id' => null],
            ['name' => json_encode(['ar' => 'إدارة أعمال']), 'slug' => 'business', 'parent_id' => null],
            ['name' => json_encode(['ar' => 'تقنية المعلومات']), 'slug' => 'it', 'parent_id' => null],
            ['name' => json_encode(['ar' => 'العلوم']), 'slug' => 'science', 'parent_id' => null],
            ['name' => json_encode(['ar' => 'القانون']), 'slug' => 'law', 'parent_id' => null],
            ['name' => json_encode(['ar' => 'التربية']), 'slug' => 'education', 'parent_id' => null],
            ['name' => json_encode(['ar' => 'الفنون']), 'slug' => 'arts', 'parent_id' => null],
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate(['slug' => $category['slug']], $category);
        }
    }
}
