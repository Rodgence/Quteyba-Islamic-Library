<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            OpportunityTypeSeeder::class,
            CountrySeeder::class,
            CategorySeeder::class,
            OpportunitySeeder::class,
            ServiceSeeder::class,
            CourseSeeder::class,
            PageSeeder::class,
            SiteSettingSeeder::class,
            RedirectSeeder::class,
        ]);
    }
}
