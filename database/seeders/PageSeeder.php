<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Page;

class PageSeeder extends Seeder
{
    public function run(): void
    {
        $pages = [
            [
                'title' => json_encode(['en' => 'About']),
                'slug' => 'about',
                'content' => json_encode(['en' => '<h2>Abu Quteyba International Islamic Library</h2><p>Abu Quteyba Islamic Library is the first global, diverse, Arabic-speaking library for obtaining Islamic scholarships and university grants, university admissions, distinguished jobs abroad, and European volunteering opportunities, in addition to applying for all trial tourist visas in Europe, America, and all countries of the world.</p><h3>Who are we?</h3><p>We are Abu Quteyba International Islamic Library, specializing in applications to universities and jobs. We offer comprehensive services including the preparation of documents such as certificates, research, and letters, in addition to photo and video design. We also offer website design services, such as the site you are currently viewing, and many other services.</p><h3>The Founder</h3><p>The founder is Dr. Abu Quteyba bin Zubair Al-Shirazi Al-Zanzibari, born in Zanzibar (Tanzania). He speaks several languages including Arabic, Swahili, and Berber. He also has working knowledge of English and French, though not fluently. His vision and passion for education led him to establish the Abu Quteyba International Islamic Library, to serve as a reference for all students and job seekers.</p><h3>Where are we?</h3><p>We are wherever you are! Our library is spread across the world thanks to our wide reach and easy accessibility. We are here to serve you wherever you are.</p>']),
                'status' => 'published',
                'seo_title' => 'About - Quteyba Islamic Library',
                'seo_description' => json_encode(['en' => 'Learn about Quteyba Islamic Library, your trusted platform for study, work, and travel opportunities.']),
            ],
            [
                'title' => json_encode(['en' => 'Contact Us']),
                'slug' => 'contact',
                'content' => json_encode(['en' => '<p>We are here to help you. Contact us via the form below or through WhatsApp.</p>']),
                'status' => 'published',
                'seo_title' => 'Contact Us - Quteyba Islamic Library',
                'seo_description' => json_encode(['en' => 'Get in touch with the Quteyba Islamic Library team for inquiries and support.']),
            ],
            [
                'title' => json_encode(['en' => 'Advertise']),
                'slug' => 'advertise',
                'content' => json_encode(['en' => '<p>Advertise with us and reach thousands of Arab students and professionals interested in study and job opportunities around the world.</p>']),
                'status' => 'published',
            ],
            [
                'title' => json_encode(['en' => 'Certificates']),
                'slug' => 'certificates',
                'content' => json_encode(['en' => '<p>We offer certificate attestation and equivalency services for use abroad. Learn about our services in this field.</p><p>We prepare all documents required for applications to universities, scholarships, and jobs, including certificate attestation from official bodies and translation into the required languages.</p>']),
                'status' => 'published',
            ],
            [
                'title' => json_encode(['en' => 'Privacy Policy']),
                'slug' => 'privacy-policy',
                'content' => json_encode(['en' => '<p>We are committed to protecting the privacy of our users. This policy explains how we collect, use, and protect personal information.</p><p>We do not share your personal information with third parties without your explicit consent.</p>']),
                'status' => 'published',
            ],
            [
                'title' => json_encode(['en' => 'Terms and Conditions']),
                'slug' => 'terms-and-conditions',
                'content' => json_encode(['en' => '<p>By using the Quteyba Islamic Library platform, you agree to the following terms and conditions.</p>']),
                'status' => 'published',
            ],
        ];

        foreach ($pages as $page) {
            Page::firstOrCreate(['slug' => $page['slug']], $page);
        }
    }
}
