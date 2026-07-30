<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CountrySeeder extends Seeder
{
    public function run(): void
    {
        foreach (require database_path('data/countries.php') as $code => $name) {
            Country::firstOrCreate(
                ['code' => $code],
                [
                    'name' => json_encode(['en' => $name]),
                    'slug' => Str::slug($name),
                ],
            );
        }
    }
}
