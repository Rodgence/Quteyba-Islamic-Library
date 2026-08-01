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
            ['key' => 'contact_phone_1', 'value' => '+255714241700', 'type' => 'string', 'group' => 'contact', 'label' => 'Phone Number 1'],
            ['key' => 'contact_phone_2', 'value' => '+255621835048', 'type' => 'string', 'group' => 'contact', 'label' => 'Phone Number 2'],
            ['key' => 'contact_address', 'value' => 'TANZANIA, Zanzibar', 'type' => 'string', 'group' => 'contact', 'label' => 'Address'],
            ['key' => 'whatsapp_number', 'value' => '255621835048', 'type' => 'string', 'group' => 'contact', 'label' => 'WhatsApp Chat Number'],
            ['key' => 'facebook_url', 'value' => 'https://www.facebook.com/profile.php?id=61562092804047', 'type' => 'string', 'group' => 'social', 'label' => 'Facebook'],
            ['key' => 'x_url', 'value' => 'https://x.com/abqtbz', 'type' => 'string', 'group' => 'social', 'label' => 'X'],
            ['key' => 'instagram_url', 'value' => 'https://www.instagram.com/abuuqutayba', 'type' => 'string', 'group' => 'social', 'label' => 'Instagram'],
            ['key' => 'youtube_url', 'value' => 'https://youtube.com/@maktabatuabuuquteyba', 'type' => 'string', 'group' => 'social', 'label' => 'YouTube'],
            ['key' => 'telegram_url', 'value' => 'https://t.me/+qAi0JaW_a-UzMDc0', 'type' => 'string', 'group' => 'social', 'label' => 'Telegram'],
            ['key' => 'whatsapp_channel_url', 'value' => 'https://whatsapp.com/channel/0029VaCiGTa4Y9lwuLDTGe3W', 'type' => 'string', 'group' => 'social', 'label' => 'WhatsApp Channel'],
        ];

        foreach ($settings as $setting) {
            SiteSetting::updateOrCreate(['key' => $setting['key']], $setting);
        }
    }
}
