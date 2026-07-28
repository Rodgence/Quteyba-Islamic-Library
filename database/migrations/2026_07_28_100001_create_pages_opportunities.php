<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            $table->json('title');
            $table->string('slug')->unique();
            $table->json('content');
            $table->string('status')->default('draft');
            $table->string('seo_title')->nullable();
            $table->json('seo_description')->nullable();
            $table->unsignedBigInteger('wordpress_id')->nullable()->index();
            $table->string('old_wordpress_url')->nullable();
            $table->timestamps();
        });

        Schema::create('opportunities', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('wordpress_id')->nullable()->index();
            $table->json('title');
            $table->string('slug')->unique();
            $table->json('excerpt')->nullable();
            $table->json('content');
            $table->json('original_content')->nullable();
            $table->foreignId('opportunity_type_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('category_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('country_id')->nullable()->constrained()->nullOnDelete();
            $table->string('organization')->nullable();
            $table->foreignId('featured_image_id')->nullable()->constrained('media')->nullOnDelete();
            $table->string('funding_type')->nullable();
            $table->string('education_level')->nullable();
            $table->string('employment_type')->nullable();
            $table->decimal('salary_amount', 12, 2)->nullable();
            $table->string('salary_currency', 3)->nullable();
            $table->string('salary_period')->nullable();
            $table->date('application_deadline')->nullable();
            $table->string('application_url')->nullable();
            $table->string('official_source_url')->nullable();
            $table->json('benefits')->nullable();
            $table->json('eligibility')->nullable();
            $table->json('required_documents')->nullable();
            $table->json('application_process')->nullable();
            $table->json('important_notes')->nullable();
            $table->string('status')->default('draft');
            $table->boolean('is_featured')->default(false);
            $table->timestamp('published_at')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->string('old_wordpress_url')->nullable();
            $table->string('seo_title')->nullable();
            $table->json('seo_description')->nullable();
            $table->timestamps();

            $table->index(['status', 'published_at']);
            $table->index(['opportunity_type_id', 'status']);
            $table->index('application_deadline');
            $table->index('is_featured');
        });

        Schema::create('opportunity_tag', function (Blueprint $table) {
            $table->foreignId('opportunity_id')->constrained()->cascadeOnDelete();
            $table->foreignId('tag_id')->constrained()->cascadeOnDelete();
            $table->primary(['opportunity_id', 'tag_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('opportunity_tag');
        Schema::dropIfExists('opportunities');
        Schema::dropIfExists('pages');
    }
};
