<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => json_encode(['en' => 'Bachelor']), 'slug' => 'bachelor', 'parent_id' => null],
            ['name' => json_encode(['en' => 'Master']), 'slug' => 'master', 'parent_id' => null],
            ['name' => json_encode(['en' => 'PhD']), 'slug' => 'phd', 'parent_id' => null],
            ['name' => json_encode(['en' => 'Languages']), 'slug' => 'languages', 'parent_id' => null],
            ['name' => json_encode(['en' => 'Engineering']), 'slug' => 'engineering', 'parent_id' => null],
            ['name' => json_encode(['en' => 'Medicine']), 'slug' => 'medicine', 'parent_id' => null],
            ['name' => json_encode(['en' => 'Business Administration']), 'slug' => 'business', 'parent_id' => null],
            ['name' => json_encode(['en' => 'Information Technology']), 'slug' => 'it', 'parent_id' => null],
            ['name' => json_encode(['en' => 'Science']), 'slug' => 'science', 'parent_id' => null],
            ['name' => json_encode(['en' => 'Law']), 'slug' => 'law', 'parent_id' => null],
            ['name' => json_encode(['en' => 'Education']), 'slug' => 'education', 'parent_id' => null],
            ['name' => json_encode(['en' => 'Arts']), 'slug' => 'arts', 'parent_id' => null],
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate(['slug' => $category['slug']], $category);
        }
    }
}
