<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        $now = now();

        foreach (require database_path('data/countries.php') as $code => $name) {
            DB::table('countries')->insertOrIgnore([
                'name' => json_encode(['en' => $name]),
                'slug' => Str::slug($name),
                'code' => $code,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }
    }

    public function down(): void
    {
        // Preserve country links used by existing posts.
    }
};
