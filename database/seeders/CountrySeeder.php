<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Country;

class CountrySeeder extends Seeder
{
    public function run(): void
    {
        $countries = [
            ['name' => json_encode(['en' => 'Saudi Arabia']), 'slug' => 'saudi-arabia', 'code' => 'SAU'],
            ['name' => json_encode(['en' => 'United Arab Emirates']), 'slug' => 'uae', 'code' => 'ARE'],
            ['name' => json_encode(['en' => 'Qatar']), 'slug' => 'qatar', 'code' => 'QAT'],
            ['name' => json_encode(['en' => 'Kuwait']), 'slug' => 'kuwait', 'code' => 'KWT'],
            ['name' => json_encode(['en' => 'Oman']), 'slug' => 'oman', 'code' => 'OMN'],
            ['name' => json_encode(['en' => 'Bahrain']), 'slug' => 'bahrain', 'code' => 'BHR'],
            ['name' => json_encode(['en' => 'Egypt']), 'slug' => 'egypt', 'code' => 'EGY'],
            ['name' => json_encode(['en' => 'Jordan']), 'slug' => 'jordan', 'code' => 'JOR'],
            ['name' => json_encode(['en' => 'Turkey']), 'slug' => 'turkey', 'code' => 'TUR'],
            ['name' => json_encode(['en' => 'United Kingdom']), 'slug' => 'uk', 'code' => 'GBR'],
            ['name' => json_encode(['en' => 'Germany']), 'slug' => 'germany', 'code' => 'DEU'],
            ['name' => json_encode(['en' => 'Canada']), 'slug' => 'canada', 'code' => 'CAN'],
            ['name' => json_encode(['en' => 'United States']), 'slug' => 'usa', 'code' => 'USA'],
            ['name' => json_encode(['en' => 'Australia']), 'slug' => 'australia', 'code' => 'AUS'],
            ['name' => json_encode(['en' => 'Malaysia']), 'slug' => 'malaysia', 'code' => 'MYS'],
            ['name' => json_encode(['en' => 'Japan']), 'slug' => 'japan', 'code' => 'JPN'],
            ['name' => json_encode(['en' => 'China']), 'slug' => 'china', 'code' => 'CHN'],
            ['name' => json_encode(['en' => 'Italy']), 'slug' => 'italy', 'code' => 'ITA'],
            ['name' => json_encode(['en' => 'France']), 'slug' => 'france', 'code' => 'FRA'],
            ['name' => json_encode(['en' => 'Spain']), 'slug' => 'spain', 'code' => 'ESP'],
        ];

        foreach ($countries as $country) {
            Country::firstOrCreate(['slug' => $country['slug']], $country);
        }
    }
}
