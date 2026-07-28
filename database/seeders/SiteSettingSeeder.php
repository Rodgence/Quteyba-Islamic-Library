<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SiteSetting;

class SiteSettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            ['key' => 'site_name', 'value' => 'مكتبة قتيبة الإسلامية', 'type' => 'string', 'group' => 'general', 'label' => 'اسم الموقع'],
            ['key' => 'site_description', 'value' => 'منصتك الموثوقة لاكتشاف أحدث فرص الدراسة والعمل والسفر حول العالم', 'type' => 'text', 'group' => 'general', 'label' => 'وصف الموقع'],
            ['key' => 'contact_email', 'value' => 'info@quteybaislamiclibrary.com', 'type' => 'string', 'group' => 'contact', 'label' => 'البريد الإلكتروني'],
            ['key' => 'whatsapp_number', 'value' => '1234567890', 'type' => 'string', 'group' => 'contact', 'label' => 'رقم واتساب'],
            ['key' => 'facebook_url', 'value' => 'https://facebook.com/quteyba', 'type' => 'string', 'group' => 'social', 'label' => 'فيسبوك'],
            ['key' => 'twitter_url', 'value' => 'https://twitter.com/quteyba', 'type' => 'string', 'group' => 'social', 'label' => 'تويتر'],
            ['key' => 'instagram_url', 'value' => 'https://instagram.com/quteyba', 'type' => 'string', 'group' => 'social', 'label' => 'انستغرام'],
            ['key' => 'youtube_url', 'value' => 'https://youtube.com/@quteyba', 'type' => 'string', 'group' => 'social', 'label' => 'يوتيوب'],
        ];

        foreach ($settings as $setting) {
            SiteSetting::firstOrCreate(['key' => $setting['key']], $setting);
        }
    }
}
