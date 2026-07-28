<?php

namespace App\Console\Commands;

use App\Models\Opportunity;
use App\Models\Page;
use App\Models\Service;
use App\Models\Course;
use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

class GenerateSitemap extends Command
{
    protected $signature = 'sitemap:generate';
    protected $description = 'Generate the XML sitemap';

    public function handle(): int
    {
        $this->info('Generating sitemap...');

        $sitemap = Sitemap::create();

        $sitemap->add(Url::create('/')->setPriority(1.0)->setChangeFrequency('daily'));
        $sitemap->add(Url::create('/opportunities')->setPriority(0.9)->setChangeFrequency('daily'));
        $sitemap->add(Url::create('/services')->setPriority(0.7)->setChangeFrequency('weekly'));
        $sitemap->add(Url::create('/courses')->setPriority(0.7)->setChangeFrequency('weekly'));
        $sitemap->add(Url::create('/about')->setPriority(0.5)->setChangeFrequency('monthly'));
        $sitemap->add(Url::create('/contact')->setPriority(0.5)->setChangeFrequency('monthly'));
        $sitemap->add(Url::create('/advertise')->setPriority(0.4)->setChangeFrequency('monthly'));
        $sitemap->add(Url::create('/certificates')->setPriority(0.4)->setChangeFrequency('monthly'));
        $sitemap->add(Url::create('/privacy-policy')->setPriority(0.3)->setChangeFrequency('yearly'));
        $sitemap->add(Url::create('/terms-and-conditions')->setPriority(0.3)->setChangeFrequency('yearly'));

        Opportunity::published()->chunk(100, function ($opportunities) use ($sitemap) {
            foreach ($opportunities as $opp) {
                $sitemap->add(
                    Url::create("/opportunities/{$opp->slug}")
                        ->setLastModificationDate($opp->updated_at)
                        ->setChangeFrequency('weekly')
                        ->setPriority(0.8)
                );
            }
        });

        Service::published()->chunk(100, function ($services) use ($sitemap) {
            foreach ($services as $service) {
                $sitemap->add(
                    Url::create("/services/{$service->slug}")
                        ->setLastModificationDate($service->updated_at)
                        ->setChangeFrequency('monthly')
                        ->setPriority(0.6)
                );
            }
        });

        Course::published()->chunk(100, function ($courses) use ($sitemap) {
            foreach ($courses as $course) {
                $sitemap->add(
                    Url::create("/courses/{$course->slug}")
                        ->setLastModificationDate($course->updated_at)
                        ->setChangeFrequency('monthly')
                        ->setPriority(0.6)
                );
            }
        });

        $sitemap->writeToFile(public_path('sitemap.xml'));

        $this->info('Sitemap generated successfully.');

        return 0;
    }
}
