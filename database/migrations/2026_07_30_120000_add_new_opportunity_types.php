<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $now = now();
        $types = [
            ['name' => json_encode(['en' => 'Certificate']), 'slug' => 'certificate', 'icon' => 'Award'],
            ['name' => json_encode(['en' => 'Document Translation']), 'slug' => 'document-translation', 'icon' => 'Languages'],
            ['name' => json_encode(['en' => 'Premium Job']), 'slug' => 'premium-job', 'icon' => 'BadgeCheck'],
        ];

        foreach ($types as $type) {
            DB::table('opportunity_types')->updateOrInsert(
                ['slug' => $type['slug']],
                [...$type, 'updated_at' => $now, 'created_at' => $now],
            );
        }
    }

    public function down(): void
    {
        // Keep published post classifications intact if this data migration is rolled back.
    }
};
