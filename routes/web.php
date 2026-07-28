<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OpportunityController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ServiceRequestController;
use App\Http\Controllers\AuthController;

// Legacy redirects
Route::redirect('/fursa', '/opportunities', 301);
Route::redirect('/fursa/', '/opportunities', 301);
Route::redirect('/about-us', '/about', 301);
Route::redirect('/about-us/', '/about', 301);
Route::redirect('/about/', '/certificates', 301);
Route::redirect('/promo', '/advertise', 301);
Route::redirect('/promo/', '/advertise', 301);

// Public routes
Route::get('/', HomeController::class)->name('home');

Route::get('/opportunities', [OpportunityController::class, 'index'])->name('opportunities.index');
Route::get('/opportunities/{slug}', [OpportunityController::class, 'show'])->name('opportunities.show');

Route::get('/services', [ServiceController::class, 'index'])->name('services.index');
Route::get('/services/{slug}', [ServiceController::class, 'show'])->name('services.show');

Route::get('/courses', [CourseController::class, 'index'])->name('courses.index');
Route::get('/courses/{slug}', [CourseController::class, 'show'])->name('courses.show');

Route::get('/contact', [ContactController::class, 'contact'])->name('contact');
Route::post('/contact', [ContactController::class, 'submitContact'])->name('contact.submit');

Route::post('/subscribe', [ContactController::class, 'subscribe'])->name('subscribe');

Route::post('/service-request', [ServiceRequestController::class, 'submit'])->name('service-request.submit');

Route::get('/search', function () {
    return Inertia::render('Public/Search');
})->name('search');

Route::get('/about', fn () => (new PageController())->show('about'))->name('about');
Route::get('/certificates', fn () => (new PageController())->show('certificates'))->name('certificates');
Route::get('/advertise', fn () => (new PageController())->show('advertise'))->name('advertise');
Route::get('/privacy-policy', fn () => (new PageController())->show('privacy-policy'))->name('privacy-policy');
Route::get('/terms-and-conditions', fn () => (new PageController())->show('terms-and-conditions'))->name('terms-and-conditions');

// Auth routes
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.submit');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Admin routes
Route::prefix('admin')->middleware(['auth', 'role_or_permission:access admin'])->name('admin.')->group(function () {
    Route::get('/', [App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');

    // Opportunities
    Route::get('/opportunities', [App\Http\Controllers\Admin\OpportunityController::class, 'index'])->name('opportunities.index');
    Route::get('/opportunities/create', [App\Http\Controllers\Admin\OpportunityController::class, 'create'])->name('opportunities.create');
    Route::post('/opportunities', [App\Http\Controllers\Admin\OpportunityController::class, 'store'])->name('opportunities.store');
    Route::get('/opportunities/{opportunity}/edit', [App\Http\Controllers\Admin\OpportunityController::class, 'edit'])->name('opportunities.edit');
    Route::put('/opportunities/{opportunity}', [App\Http\Controllers\Admin\OpportunityController::class, 'update'])->name('opportunities.update');
    Route::delete('/opportunities/{opportunity}', [App\Http\Controllers\Admin\OpportunityController::class, 'destroy'])->name('opportunities.destroy');
    Route::post('/opportunities/bulk-delete', [App\Http\Controllers\Admin\OpportunityController::class, 'bulkDelete'])->name('opportunities.bulk-delete');
    Route::post('/opportunities/bulk-status', [App\Http\Controllers\Admin\OpportunityController::class, 'bulkUpdateStatus'])->name('opportunities.bulk-status');

    // Pages
    Route::get('/pages', [App\Http\Controllers\Admin\PageController::class, 'index'])->name('pages.index');
    Route::get('/pages/create', [App\Http\Controllers\Admin\PageController::class, 'create'])->name('pages.create');
    Route::post('/pages', [App\Http\Controllers\Admin\PageController::class, 'store'])->name('pages.store');
    Route::get('/pages/{page}/edit', [App\Http\Controllers\Admin\PageController::class, 'edit'])->name('pages.edit');
    Route::put('/pages/{page}', [App\Http\Controllers\Admin\PageController::class, 'update'])->name('pages.update');
    Route::delete('/pages/{page}', [App\Http\Controllers\Admin\PageController::class, 'destroy'])->name('pages.destroy');

    // Types
    Route::get('/types', [App\Http\Controllers\AdminTypesController::class, 'index'])->name('types.index');
    Route::post('/types', [App\Http\Controllers\AdminTypesController::class, 'store'])->name('types.store');
    Route::put('/types/{type}', [App\Http\Controllers\AdminTypesController::class, 'update'])->name('types.update');
    Route::delete('/types/{type}', [App\Http\Controllers\AdminTypesController::class, 'destroy'])->name('types.destroy');

    // Countries
    Route::get('/countries', [App\Http\Controllers\AdminCountriesController::class, 'index'])->name('countries.index');
    Route::post('/countries', [App\Http\Controllers\AdminCountriesController::class, 'store'])->name('countries.store');
    Route::put('/countries/{country}', [App\Http\Controllers\AdminCountriesController::class, 'update'])->name('countries.update');
    Route::delete('/countries/{country}', [App\Http\Controllers\AdminCountriesController::class, 'destroy'])->name('countries.destroy');

    // Categories
    Route::get('/categories', [App\Http\Controllers\AdminCategoriesController::class, 'index'])->name('categories.index');
    Route::post('/categories', [App\Http\Controllers\AdminCategoriesController::class, 'store'])->name('categories.store');

    // Messages
    Route::get('/messages', [App\Http\Controllers\Admin\ContactMessageController::class, 'index'])->name('messages.index');
    Route::get('/messages/{message}', [App\Http\Controllers\Admin\ContactMessageController::class, 'show'])->name('messages.show');
    Route::delete('/messages/{message}', [App\Http\Controllers\Admin\ContactMessageController::class, 'destroy'])->name('messages.destroy');

    // Services
    Route::get('/services', [\App\Http\Controllers\Admin\ServiceController::class, 'index'])->name('services.index');
    Route::post('/services', [\App\Http\Controllers\Admin\ServiceController::class, 'store'])->name('services.store');
    Route::put('/services/{service}', [\App\Http\Controllers\Admin\ServiceController::class, 'update'])->name('services.update');
    Route::delete('/services/{service}', [\App\Http\Controllers\Admin\ServiceController::class, 'destroy'])->name('services.destroy');

    Route::get('/courses', fn () => Inertia::render('Admin/Courses/Index', [
        'courses' => \App\Models\Course::get(),
    ]))->name('courses.index');

    // Media
    Route::get('/media', fn () => Inertia::render('Admin/Media/Index', [
        'media' => \App\Models\Media::latest()->paginate(30),
    ]))->name('media.index');

    // Redirects
    Route::get('/redirects', fn () => Inertia::render('Admin/Redirects/Index', [
        'redirects' => \App\Models\Redirect::latest()->paginate(30),
    ]))->name('redirects.index');

    // Subscribers
    Route::get('/subscribers', fn () => Inertia::render('Admin/Subscribers/Index', [
        'subscribers' => \App\Models\Subscriber::latest()->paginate(30),
    ]))->name('subscribers.index');

    // Settings
    Route::get('/settings', fn () => Inertia::render('Admin/Settings/Index', [
        'settings' => \App\Models\SiteSetting::get()->groupBy('group'),
    ]))->name('settings.index');

    // Users
    Route::get('/users', fn () => Inertia::render('Admin/Users/Index', [
        'users' => \App\Models\User::with('roles')->paginate(20),
    ]))->name('users.index');
});

Route::get('/robots.txt', function () {
    $content = "User-agent: *\n";
    $content .= "Allow: /\n";
    $content .= "Disallow: /admin\n";
    $content .= "Disallow: /login\n";
    $content .= "Sitemap: " . url('/sitemap.xml') . "\n";
    return response($content, 200)->header('Content-Type', 'text/plain');
});
