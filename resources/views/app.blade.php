<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    @php
        $seo = data_get($page ?? [], 'props.seo', []);
        $seoTitle = data_get($seo, 'title', config('app.name'));
        $seoDescription = data_get($seo, 'description');
        $seoImage = data_get($seo, 'og_image');
        $canonicalUrl = data_get($seo, 'canonical_url', request()->fullUrl());
        $ogType = data_get($seo, 'og_type', 'website');
    @endphp
    <title>{{ $seoTitle }}</title>
    @if ($seoDescription)
        <meta name="description" content="{{ $seoDescription }}" />
        <meta property="og:description" content="{{ $seoDescription }}" />
    @endif
    <meta property="og:title" content="{{ $seoTitle }}" />
    <meta property="og:type" content="{{ $ogType }}" />
    <meta property="og:url" content="{{ $canonicalUrl }}" />
    @if ($seoImage)
        <meta property="og:image" content="{{ $seoImage }}" />
        <meta property="og:image:alt" content="{{ $seoTitle }}" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="{{ $seoImage }}" />
    @endif

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

    @inertiaHead

    @routes

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.tsx'])
</head>
<body class="font-sans antialiased">
    @inertia
</body>
</html>
