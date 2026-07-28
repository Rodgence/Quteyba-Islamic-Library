<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->json('title');
            $table->string('slug')->unique();
            $table->json('introduction');
            $table->json('description');
            $table->json('deliverables')->nullable();
            $table->json('required_documents')->nullable();
            $table->json('process_steps')->nullable();
            $table->decimal('price', 10, 2)->nullable();
            $table->string('price_currency', 3)->nullable();
            $table->json('faq')->nullable();
            $table->foreignId('featured_image_id')->nullable()->constrained('media')->nullOnDelete();
            $table->string('status')->default('draft');
            $table->string('seo_title')->nullable();
            $table->json('seo_description')->nullable();
            $table->timestamps();
        });

        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->json('name');
            $table->string('slug')->unique();
            $table->json('description');
            $table->string('language');
            $table->string('level');
            $table->string('duration')->nullable();
            $table->string('delivery_method');
            $table->string('instructor')->nullable();
            $table->decimal('price', 10, 2)->nullable();
            $table->string('price_currency', 3)->nullable();
            $table->string('registration_status')->default('open');
            $table->foreignId('featured_image_id')->nullable()->constrained('media')->nullOnDelete();
            $table->string('status')->default('draft');
            $table->string('seo_title')->nullable();
            $table->json('seo_description')->nullable();
            $table->timestamps();
        });

        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('position')->nullable();
            $table->json('content');
            $table->foreignId('avatar_id')->nullable()->constrained('media')->nullOnDelete();
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('testimonials');
        Schema::dropIfExists('courses');
        Schema::dropIfExists('services');
    }
};
