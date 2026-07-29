<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\OpportunityType;

class OpportunityTypeSeeder extends Seeder
{
    public function run(): void
    {
        $types = [
            ['name' => json_encode(['en' => 'Scholarship']), 'slug' => 'scholarship', 'icon' => 'GraduationCap'],
            ['name' => json_encode(['en' => 'Job']), 'slug' => 'job', 'icon' => 'Briefcase'],
            ['name' => json_encode(['en' => 'Internship']), 'slug' => 'internship', 'icon' => 'Building2'],
            ['name' => json_encode(['en' => 'Vocational Training']), 'slug' => 'training', 'icon' => 'Wrench'],
            ['name' => json_encode(['en' => 'Volunteering']), 'slug' => 'volunteering', 'icon' => 'Heart'],
            ['name' => json_encode(['en' => 'Visa']), 'slug' => 'visa', 'icon' => 'Plane'],
            ['name' => json_encode(['en' => 'Travel Programme']), 'slug' => 'travel-programme', 'icon' => 'Globe'],
            ['name' => json_encode(['en' => 'Conference']), 'slug' => 'conference', 'icon' => 'Users'],
            ['name' => json_encode(['en' => 'Competition']), 'slug' => 'competition', 'icon' => 'Trophy'],
        ];

        foreach ($types as $type) {
            OpportunityType::firstOrCreate(['slug' => $type['slug']], $type);
        }
    }
}
