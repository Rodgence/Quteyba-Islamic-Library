<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->renameColumn('introduction', 'short_description');
            $table->renameColumn('description', 'content');

            $table->string('icon')->nullable()->after('slug');
            $table->string('whatsapp_url')->nullable()->after('icon');
            $table->boolean('is_active')->default(true)->after('status');
            $table->integer('display_order')->default(0)->after('is_active');
            $table->unsignedBigInteger('source_wordpress_id')->nullable()->after('display_order');
            $table->string('source_wordpress_url')->nullable()->after('source_wordpress_id');
            $table->text('original_excerpt')->nullable()->after('source_wordpress_url');
        });
    }

    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->renameColumn('short_description', 'introduction');
            $table->renameColumn('content', 'description');

            $table->dropColumn([
                'icon', 'whatsapp_url', 'is_active', 'display_order',
                'source_wordpress_id', 'source_wordpress_url', 'original_excerpt',
            ]);
        });
    }
};
