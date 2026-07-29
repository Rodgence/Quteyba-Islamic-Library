<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Schema;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'title' => json_encode(['en' => 'Scholarship Application Assistance']),
                'slug' => 'scholarship-application-assistance',
                'short_description' => json_encode(['en' => 'Helping students search for suitable scholarships, review requirements, and prepare applications in an organized, professional manner.']),
                'content' => json_encode(['en' => '<h2>Scholarship Application Assistance Service</h2><p>Scholarships are an important opportunity for students wishing to continue their education at home or abroad. Fully or partially funded scholarships help reduce study and living costs and open new doors for learning and academic development.</p><p>Abu Quteyba International Islamic Library offers a service to help applicants choose suitable scholarships, understand their conditions, and prepare their files before submitting the application.</p><h3>What does the service include?</h3><ul><li>Reviewing the student\'s information, study stage, and required major.</li><li>Suggesting suitable scholarships based on qualifications, country, and major.</li><li>Reviewing admission requirements and deadlines.</li><li>Organizing the required documents and ensuring they are complete.</li><li>Reviewing the CV and motivation letter when needed.</li><li>Helping fill out the online application form.</li><li>Following up on the application status according to the granting body\'s system.</li></ul><h3>Documents that may be requested</h3><ul><li>Passport or identity document.</li><li>Official certificates and transcripts.</li><li>CV.</li><li>Motivation letter.</li><li>Recommendation letters.</li><li>Language certificate if required.</li></ul><h3>Important Notice</h3><p>The service does not guarantee admission; the final admission decision rests with the university or granting body. Our role is to help you prepare a correct, organized file and submit it according to published requirements.</p><p>Our services are paid, and the price is determined after reviewing the type of scholarship and the amount of work required.</p>']),
                'icon' => 'graduation-cap',
                'whatsapp_url' => 'https://wa.me/255714241700',
                'status' => 'published',
                'is_active' => true,
                'display_order' => 1,
                'seo_title' => 'Scholarship Application Assistance | Abu Quteyba Library',
                'seo_description' => json_encode(['en' => 'Professional assistance in choosing scholarships, reviewing requirements, preparing documents, and submitting applications to universities and granting bodies.']),
                'source_wordpress_id' => 1827,
                'source_wordpress_url' => 'https://www.quteybaislamiclibrary.com/services/',
                'original_excerpt' => 'Scholarships are a great opportunity for students around the world. These scholarships provide financial support that helps students achieve their academic goals and complete their studies at prestigious institutions.',
            ],
            [
                'title' => json_encode(['en' => 'Islamic Studies Scholarship Assistance']),
                'slug' => 'islamic-studies-scholarship-assistance',
                'short_description' => json_encode(['en' => 'Helping students find opportunities to study Islamic sciences and culture, and apply to suitable universities and institutes.']),
                'content' => json_encode(['en' => '<h2>Islamic Studies Scholarship Application Service</h2><p>Islamic studies scholarships provide opportunities for students wishing to study the Quran, Hadith, jurisprudence, creed, the Arabic language, and Islamic sciences at recognized universities and institutes.</p><p>We help the applicant search for suitable programs, read admission requirements, and prepare the application file according to each institution\'s requirements.</p><h3>The service includes</h3><ul><li>Searching for universities and institutes offering Islamic studies programs.</li><li>Clarifying the study stage and available majors.</li><li>Reviewing age, qualification, and language requirements.</li><li>Preparing a list of required documents.</li><li>Reviewing the motivation letter and CV.</li><li>Helping submit and follow up on the application.</li></ul><h3>Programs that can be searched for</h3><ul><li>Islamic Studies.</li><li>Sharia and Law.</li><li>The Quran and its Sciences.</li><li>Hadith and its Sciences.</li><li>Islamic Da\'wah and Culture.</li><li>Arabic for Non-Native Speakers.</li></ul><p>Admission and funding are subject to the decisions of universities and granting bodies, and a specific outcome cannot be guaranteed.</p>']),
                'icon' => 'book-open',
                'whatsapp_url' => 'https://wa.me/255714241700',
                'status' => 'published',
                'is_active' => true,
                'display_order' => 2,
                'seo_title' => 'Islamic Studies Scholarship Applications | Abu Quteyba Library',
                'seo_description' => json_encode(['en' => 'Assistance in researching and applying for Islamic studies, sharia sciences, and Arabic language scholarships and programs.']),
                'source_wordpress_id' => 1827,
                'source_wordpress_url' => 'https://www.quteybaislamiclibrary.com/services/',
                'original_excerpt' => 'Islamic studies scholarships are an opportunity for students to study Islamic culture and sharia sciences at prestigious institutions.',
            ],
            [
                'title' => json_encode(['en' => 'University Applications & Admissions']),
                'slug' => 'university-application-assistance',
                'short_description' => json_encode(['en' => 'Helping students choose universities and programs, prepare admission files, and follow up on enrollment applications.']),
                'content' => json_encode(['en' => '<h2>University Application & Admission Service</h2><p>Abu Quteyba International Islamic Library helps students search for universities and programs that suit their qualifications and academic goals, then organizes admission documents and reviews the application before it is submitted.</p><h3>What do we offer?</h3><ul><li>Comparing universities and study programs.</li><li>Reviewing admission requirements for each program.</li><li>Creating a clear list of required documents.</li><li>Reviewing the CV and motivation letter.</li><li>Helping fill out the admission form.</li><li>Following up on university correspondence and requests to complete the file.</li></ul><h3>Study Stages</h3><ul><li>Diploma.</li><li>Bachelor\'s.</li><li>Master\'s.</li><li>PhD.</li><li>Language and foundation programs.</li></ul><p>Fees and requirements vary from university to university. Our service fees do not include university fees or admission application fees unless clearly agreed otherwise.</p><p>The admission decision is issued by the university alone, and the service does not guarantee final admission.</p>']),
                'icon' => 'school',
                'whatsapp_url' => 'https://wa.me/255714241700',
                'status' => 'published',
                'is_active' => true,
                'display_order' => 3,
                'seo_title' => 'University Applications & International Admissions Service',
                'seo_description' => json_encode(['en' => 'Helping students choose universities, prepare admission files, review documents, and follow up on enrollment applications.']),
                'source_wordpress_id' => 1788,
                'source_wordpress_url' => 'https://www.quteybaislamiclibrary.com/about-us/',
                'original_excerpt' => 'We are Abu Quteyba International Islamic Library, specializing in applications to universities and jobs.',
            ],
            [
                'title' => json_encode(['en' => 'Document Translation']),
                'slug' => 'document-translation',
                'short_description' => json_encode(['en' => 'Translating academic, personal, and professional documents to and from available languages, with formatting and data review.']),
                'content' => json_encode(['en' => '<h2>Document Translation Service</h2><p>We offer document translation to and from available languages depending on the type of document and the body it will be submitted to. The language, number of pages, delivery date, and type of translation required are agreed upon in advance.</p><h3>Documents we can help translate</h3><ul><li>Certificates and transcripts.</li><li>CV.</li><li>Motivation and recommendation letters.</li><li>Identity and civil status documents.</li><li>Admission letters and academic correspondence.</li><li>Work and professional experience documents.</li></ul><h3>How it works</h3><ol><li>Send a clear copy of the document.</li><li>Specify the required language and receiving body.</li><li>Assess the number of pages, duration, and cost.</li><li>Carry out and review the translation.</li><li>Send the final version in the agreed format.</li></ol><h3>Note</h3><p>When the receiving body requires a sworn or certified translation from a specific translator or official body, you must verify it is accepted in your country before starting the service. Translation is not presented as government certification unless it is actually issued by an authorized body.</p>']),
                'icon' => 'languages',
                'whatsapp_url' => 'https://wa.me/255621835048',
                'status' => 'published',
                'is_active' => true,
                'display_order' => 4,
                'seo_title' => 'Academic & Personal Document Translation Service',
                'seo_description' => json_encode(['en' => 'Translation of certificates, CVs, letters, and personal and professional documents according to the receiving body\'s requirements.']),
                'source_wordpress_id' => 1827,
                'source_wordpress_url' => 'https://www.quteybaislamiclibrary.com/services/',
                'original_excerpt' => 'We offer document translation to and from all languages, quickly and efficiently, according to your choice.',
            ],
            [
                'title' => json_encode(['en' => 'Gulf Job Application Assistance']),
                'slug' => 'gulf-job-application-assistance',
                'short_description' => json_encode(['en' => 'Helping job seekers prepare their CV, find suitable postings, and submit job applications.']),
                'content' => json_encode(['en' => '<h2>Gulf Job Application Assistance Service</h2><p>We help job seekers prepare an organized professional file and search for published opportunities that match their experience and qualifications in the Gulf countries.</p><h3>The service includes</h3><ul><li>Reviewing and formatting the CV.</li><li>Identifying suitable job titles.</li><li>Searching for job postings published by various bodies.</li><li>Reviewing job requirements before applying.</li><li>Helping write the cover letter.</li><li>Organizing applications and following up on available responses.</li></ul><h3>What the service does not include</h3><ul><li>We do not guarantee getting a job.</li><li>We do not issue work contracts or visas on behalf of governments or companies.</li><li>We do not ask the client to provide false information or documents.</li><li>Fees do not include any government fees or external recruitment agency fees.</li></ul><p>The hiring decision is made by the employer, and visa issuance is subject to the competent government authorities.</p>']),
                'icon' => 'briefcase-business',
                'whatsapp_url' => 'https://wa.me/255621835048',
                'status' => 'published',
                'is_active' => true,
                'display_order' => 5,
                'seo_title' => 'Gulf Job Application Assistance',
                'seo_description' => json_encode(['en' => 'CV review, job search, and application preparation for Gulf countries without unrealistic acceptance promises.']),
                'source_wordpress_id' => 1827,
                'source_wordpress_url' => 'https://www.quteybaislamiclibrary.com/services/',
                'original_excerpt' => 'We offer guaranteed job opportunities in the Gulf countries at low fees, and here you will also find competitive jobs that suit your skills.',
            ],
            [
                'title' => json_encode(['en' => 'Academic & Research Support']),
                'slug' => 'academic-research-support',
                'short_description' => json_encode(['en' => 'Methodological guidance, language review, reference formatting, and research skill development without writing academic work for submission on the student\'s behalf.']),
                'content' => json_encode(['en' => '<h2>Academic & Research Support Service</h2><p>The service aims to help students and researchers improve the quality of their academic work while maintaining academic integrity and the student\'s responsibility for their own work.</p><h3>Available Services</h3><ul><li>Discussing the research idea and narrowing its topic.</li><li>Helping build the research plan.</li><li>Explaining the appropriate research methodology.</li><li>Reviewing language, style, and clarity.</li><li>Formatting references according to the required style.</li><li>Reviewing tables, headings, and the table of contents.</li><li>Providing feedback to help the student develop their own version.</li><li>Training on presentation and discussion.</li></ul><h3>Academic Integrity Guidelines</h3><p>The service does not include writing a complete research paper or thesis to be submitted under another student\'s name, changing results, fabricating sources, or bypassing university systems. The student remains responsible for their ideas, data, analysis, and the version they submit.</p>']),
                'icon' => 'notebook-pen',
                'whatsapp_url' => 'https://wa.me/255621835048',
                'status' => 'published',
                'is_active' => true,
                'display_order' => 6,
                'seo_title' => 'Academic Support & Research Review',
                'seo_description' => json_encode(['en' => 'Methodological guidance, language review, reference formatting, and research development while respecting academic integrity.']),
                'source_wordpress_id' => 2421,
                'source_wordpress_url' => 'https://www.quteybaislamiclibrary.com/خدمة-بحث-التخرج/',
                'original_excerpt' => 'We offer official letter and specialized academic research services to help you achieve your academic goals.',
            ],
            [
                'title' => json_encode(['en' => 'Letter Preparation & Review']),
                'slug' => 'academic-and-professional-letters',
                'short_description' => json_encode(['en' => 'Reviewing and drafting motivation letters, cover letters, and official requests that honestly reflect the applicant\'s information.']),
                'content' => json_encode(['en' => '<h2>Letter Preparation & Review Service</h2><p>We help students and job seekers organize and draft the letters required for applications, based on their real information, experience, and goals.</p><h3>Types of Letters</h3><ul><li>Motivation letters for scholarships and universities.</li><li>Cover letters for jobs.</li><li>Internship or volunteering request letters.</li><li>Inquiry or follow-up letters.</li><li>Deferral or reconsideration requests.</li><li>Formatting a draft recommendation letter for the recommender to review and approve.</li></ul><h3>What we need from the client</h3><ul><li>Program or job name.</li><li>Receiving body\'s requirements.</li><li>CV.</li><li>Real experience and achievements.</li><li>Academic or professional goals.</li><li>Word limit and deadline.</li></ul><p>No false information or experience is added, and the letter is not presented as issued by a body or person who has not reviewed and approved it.</p>']),
                'icon' => 'file-text',
                'whatsapp_url' => 'https://wa.me/255621835048',
                'status' => 'published',
                'is_active' => true,
                'display_order' => 7,
                'seo_title' => 'Motivation, Cover, and Official Letter Preparation',
                'seo_description' => json_encode(['en' => 'Drafting and reviewing motivation letters, cover letters, and official requests based on the applicant\'s real information.']),
                'source_wordpress_id' => 1827,
                'source_wordpress_url' => 'https://www.quteybaislamiclibrary.com/services/',
                'original_excerpt' => 'We offer official letter and specialized academic research services to help you achieve your academic goals.',
            ],
            [
                'title' => json_encode(['en' => 'Document & Certificate Services']),
                'slug' => 'certificate-document-support',
                'short_description' => json_encode(['en' => 'Legal assistance in organizing, translating, attesting, and verifying documents and certificates issued by their original bodies.']),
                'content' => json_encode(['en' => '<h2>Document & Certificate Services</h2><p>We help clients organize official documents and certificates issued by schools, universities, and professional bodies, and prepare them for use in admission, work, or immigration applications according to published requirements.</p><h3>Available Services</h3><ul><li>Reviewing the clarity of certificate and transcript data.</li><li>Translating documents through a qualified body or translator when needed.</li><li>Guiding the client through official attestation or equivalency steps.</li><li>Organizing the required copies for admission and job applications.</li><li>Helping the client contact the issuing body to obtain an official copy.</li><li>Reviewing electronic document verification requirements.</li></ul><h3>Legal Notice</h3><p>We do not sell academic certificates, nor do we create or alter qualifications, grades, or official seals. All documents must be legally issued by the competent educational or professional body.</p><p>Attestation, equivalency, or verification fees charged by official bodies are not included in the service fees unless clearly stated.</p>']),
                'icon' => 'badge-check',
                'whatsapp_url' => 'https://wa.me/255714241700',
                'status' => 'published',
                'is_active' => true,
                'display_order' => 8,
                'seo_title' => 'Certificate Translation, Attestation & Verification Services',
                'seo_description' => json_encode(['en' => 'Legal assistance in translating, attesting, and verifying certificates and official documents issued by their original bodies.']),
                'source_wordpress_id' => 1188,
                'source_wordpress_url' => 'https://www.quteybaislamiclibrary.com/about/',
                'original_excerpt' => 'We offer competitively priced certificate services, from high school diplomas to master\'s degrees.',
            ],
            [
                'title' => json_encode(['en' => 'Visa Application Assistance']),
                'slug' => 'visa-application-assistance',
                'short_description' => json_encode(['en' => 'Reviewing visa requirements, organizing documents, and helping the applicant fill out the application without guaranteeing the embassy\'s decision.']),
                'content' => json_encode(['en' => '<h2>Visa Application Assistance Service</h2><p>We help travelers, students, and opportunity seekers understand visa requirements, organize documents, and fill out forms according to official information available from the embassy or competent government body.</p><h3>The service includes</h3><ul><li>Identifying the appropriate visa type for the purpose of travel.</li><li>Preparing a list of required documents.</li><li>Reviewing data before submitting the application.</li><li>Helping fill out the online form.</li><li>Organizing the file according to the embassy\'s instructions.</li><li>Guiding through appointment booking steps when available.</li><li>Providing feedback to prepare for the interview without coaching false information.</li></ul><h3>Important Notice</h3><p>We do not guarantee visa issuance, and we have no influence on the decisions of embassies or immigration departments. All information and documents submitted must be true and verifiable.</p><p>Embassy fees, insurance, medical examination, translation, and appointment booking are separate from our assistance fees unless otherwise agreed.</p>']),
                'icon' => 'plane',
                'whatsapp_url' => 'https://wa.me/255714241700',
                'status' => 'published',
                'is_active' => true,
                'display_order' => 9,
                'seo_title' => 'Visa Application Preparation & Assistance',
                'seo_description' => json_encode(['en' => 'Reviewing visa requirements, organizing documents, and completing applications according to embassy and official body instructions.']),
                'source_wordpress_id' => 1827,
                'source_wordpress_url' => 'https://www.quteybaislamiclibrary.com/services/',
                'original_excerpt' => 'Get a visa to any country easily! Get ready to explore the world and experience new adventures with our comprehensive services.',
            ],
            [
                'title' => json_encode(['en' => 'Digital Design Services']),
                'slug' => 'digital-design-services',
                'short_description' => json_encode(['en' => 'Designing images, videos, pages, and digital websites for individuals and organizations within an agreed scope of work.']),
                'content' => json_encode(['en' => '<h2>Digital Design Services</h2><p>In addition to our opportunity and education services, we offer digital services for individuals and organizations wishing to improve their online presence or prepare professional visual materials.</p><h3>Available Services</h3><ul><li>Designing digital posts and ads.</li><li>Designing cover images and banners.</li><li>Editing short videos.</li><li>Designing landing pages.</li><li>Designing and developing informational websites.</li><li>Preparing content for publishing on digital platforms.</li></ul><h3>How it works</h3><ol><li>Receiving the project description and goals.</li><li>Determining the required pages or designs.</li><li>Agreeing on duration, cost, and number of revisions.</li><li>Producing the first version and receiving feedback.</li><li>Delivering the files or website after approval.</li></ol><p>Cost varies depending on project size, file type, delivery time, and number of revisions required.</p>']),
                'icon' => 'palette',
                'whatsapp_url' => 'https://wa.me/255621835048',
                'status' => 'published',
                'is_active' => true,
                'display_order' => 10,
                'seo_title' => 'Image, Video, and Website Design Services',
                'seo_description' => json_encode(['en' => 'Designing visual materials, landing pages, and informational websites for individuals and organizations.']),
                'source_wordpress_id' => 1788,
                'source_wordpress_url' => 'https://www.quteybaislamiclibrary.com/about-us/',
                'original_excerpt' => 'We offer comprehensive services including document preparation such as certificates, research, and letters, in addition to photo and video design. We also offer website design services.',
            ],
        ];

        $model = new Service();
        $table = $model->getTable();
        $columns = Schema::getColumnListing($table);

        foreach ($services as $service) {
            $slug = $service['slug'];
            $payload = Arr::only($service, $columns);

            Service::query()->updateOrCreate(
                ['slug' => $slug],
                $payload
            );
        }
    }
}
