<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Redirect;

class RedirectSeeder extends Seeder
{
    public function run(): void
    {
        $redirects = [
            ['from_url' => '/fursa/', 'to_url' => '/opportunities', 'status_code' => 301],
            ['from_url' => '/fursa', 'to_url' => '/opportunities', 'status_code' => 301],
            ['from_url' => '/about-us/', 'to_url' => '/about', 'status_code' => 301],
            ['from_url' => '/about-us', 'to_url' => '/about', 'status_code' => 301],
            ['from_url' => '/about/', 'to_url' => '/certificates', 'status_code' => 301],
            ['from_url' => '/promo/', 'to_url' => '/advertise', 'status_code' => 301],
            ['from_url' => '/promo', 'to_url' => '/advertise', 'status_code' => 301],
        ];

        foreach ($redirects as $redirect) {
            Redirect::firstOrCreate(['from_url' => $redirect['from_url']], $redirect);
        }
    }
}
