<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\OpportunityType;

class OpportunityTypeSeeder extends Seeder
{
    public function run(): void
    {
        $types = [
            ['name' => json_encode(['ar' => 'منحة دراسية']), 'slug' => 'scholarship', 'icon' => 'GraduationCap'],
            ['name' => json_encode(['ar' => 'وظيفة']), 'slug' => 'job', 'icon' => 'Briefcase'],
            ['name' => json_encode(['ar' => 'تدريب']), 'slug' => 'internship', 'icon' => 'Building2'],
            ['name' => json_encode(['ar' => 'تدريب مهني']), 'slug' => 'training', 'icon' => 'Wrench'],
            ['name' => json_encode(['ar' => 'تطوع']), 'slug' => 'volunteering', 'icon' => 'Heart'],
            ['name' => json_encode(['ar' => 'تأشيرة']), 'slug' => 'visa', 'icon' => 'Plane'],
            ['name' => json_encode(['ar' => 'برنامج سفر']), 'slug' => 'travel-programme', 'icon' => 'Globe'],
            ['name' => json_encode(['ar' => 'مؤتمر']), 'slug' => 'conference', 'icon' => 'Users'],
            ['name' => json_encode(['ar' => 'مسابقة']), 'slug' => 'competition', 'icon' => 'Trophy'],
        ];

        foreach ($types as $type) {
            OpportunityType::firstOrCreate(['slug' => $type['slug']], $type);
        }
    }
}
