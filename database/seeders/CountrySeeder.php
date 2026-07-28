<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Country;

class CountrySeeder extends Seeder
{
    public function run(): void
    {
        $countries = [
            ['name' => json_encode(['ar' => 'السعودية']), 'slug' => 'saudi-arabia', 'code' => 'SAU'],
            ['name' => json_encode(['ar' => 'الإمارات']), 'slug' => 'uae', 'code' => 'ARE'],
            ['name' => json_encode(['ar' => 'قطر']), 'slug' => 'qatar', 'code' => 'QAT'],
            ['name' => json_encode(['ar' => 'الكويت']), 'slug' => 'kuwait', 'code' => 'KWT'],
            ['name' => json_encode(['ar' => 'عُمان']), 'slug' => 'oman', 'code' => 'OMN'],
            ['name' => json_encode(['ar' => 'البحرين']), 'slug' => 'bahrain', 'code' => 'BHR'],
            ['name' => json_encode(['ar' => 'مصر']), 'slug' => 'egypt', 'code' => 'EGY'],
            ['name' => json_encode(['ar' => 'الأردن']), 'slug' => 'jordan', 'code' => 'JOR'],
            ['name' => json_encode(['ar' => 'تركيا']), 'slug' => 'turkey', 'code' => 'TUR'],
            ['name' => json_encode(['ar' => 'المملكة المتحدة']), 'slug' => 'uk', 'code' => 'GBR'],
            ['name' => json_encode(['ar' => 'ألمانيا']), 'slug' => 'germany', 'code' => 'DEU'],
            ['name' => json_encode(['ar' => 'كندا']), 'slug' => 'canada', 'code' => 'CAN'],
            ['name' => json_encode(['ar' => 'الولايات المتحدة']), 'slug' => 'usa', 'code' => 'USA'],
            ['name' => json_encode(['ar' => 'أستراليا']), 'slug' => 'australia', 'code' => 'AUS'],
            ['name' => json_encode(['ar' => 'ماليزيا']), 'slug' => 'malaysia', 'code' => 'MYS'],
            ['name' => json_encode(['ar' => 'اليابان']), 'slug' => 'japan', 'code' => 'JPN'],
            ['name' => json_encode(['ar' => 'الصين']), 'slug' => 'china', 'code' => 'CHN'],
            ['name' => json_encode(['ar' => 'إيطاليا']), 'slug' => 'italy', 'code' => 'ITA'],
            ['name' => json_encode(['ar' => 'فرنسا']), 'slug' => 'france', 'code' => 'FRA'],
            ['name' => json_encode(['ar' => 'إسبانيا']), 'slug' => 'spain', 'code' => 'ESP'],
        ];

        foreach ($countries as $country) {
            Country::firstOrCreate(['slug' => $country['slug']], $country);
        }
    }
}
