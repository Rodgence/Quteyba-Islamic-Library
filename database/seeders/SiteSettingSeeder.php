<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SiteSetting;

class SiteSettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            ['key' => 'site_name', 'value' => 'Quteyba Islamic Library', 'type' => 'string', 'group' => 'general', 'label' => 'Site Name'],
            ['key' => 'site_description', 'value' => 'Your trusted platform for discovering the latest study, work, and travel opportunities around the world', 'type' => 'text', 'group' => 'general', 'label' => 'Site Description'],
            ['key' => 'contact_email', 'value' => 'info@quteybaislamiclibrary.com', 'type' => 'string', 'group' => 'contact', 'label' => 'Email'],
            ['key' => 'whatsapp_number', 'value' => '1234567890', 'type' => 'string', 'group' => 'contact', 'label' => 'WhatsApp Number'],
            ['key' => 'facebook_url', 'value' => 'https://facebook.com/quteyba', 'type' => 'string', 'group' => 'social', 'label' => 'Facebook'],
            ['key' => 'twitter_url', 'value' => 'https://twitter.com/quteyba', 'type' => 'string', 'group' => 'social', 'label' => 'Twitter'],
            ['key' => 'instagram_url', 'value' => 'https://instagram.com/quteyba', 'type' => 'string', 'group' => 'social', 'label' => 'Instagram'],
            ['key' => 'youtube_url', 'value' => 'https://youtube.com/@quteyba', 'type' => 'string', 'group' => 'social', 'label' => 'YouTube'],
        ];

        foreach ($settings as $setting) {
            SiteSetting::firstOrCreate(['key' => $setting['key']], $setting);
        }
    }
}
