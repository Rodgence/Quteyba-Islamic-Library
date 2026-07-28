<?php

namespace App\Http\Controllers;

use App\Models\OpportunityType;
use App\Models\Category;
use App\Models\Country;
use App\Models\Service;
use App\Models\Course;
use App\Models\ServiceRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'role_or_permission:access admin']);
    }
}

class AdminTypesController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'role_or_permission:access admin']);
    }

    public function index()
    {
        return Inertia::render('Admin/Types/Index', [
            'types' => OpportunityType::withCount('opportunities')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|json',
            'slug' => 'required|string|unique:opportunity_types',
            'icon' => 'nullable|string',
        ]);

        OpportunityType::create($validated);
        return back()->with('success', 'تم إنشاء النوع بنجاح.');
    }

    public function update(Request $request, OpportunityType $type)
    {
        $type->update($request->validate([
            'name' => 'required|json',
            'slug' => 'required|string|unique:opportunity_types,slug,' . $type->id,
            'icon' => 'nullable|string',
        ]));
        return back()->with('success', 'تم تحديث النوع.');
    }

    public function destroy(OpportunityType $type)
    {
        $type->delete();
        return back()->with('success', 'تم حذف النوع.');
    }
}

class AdminCountriesController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'role_or_permission:access admin']);
    }

    public function index()
    {
        return Inertia::render('Admin/Countries/Index', [
            'countries' => Country::withCount('opportunities')->get(),
        ]);
    }

    public function store(Request $request)
    {
        Country::create($request->validate([
            'name' => 'required|json',
            'slug' => 'required|string|unique:countries',
            'code' => 'required|string|size:3|unique:countries',
        ]));
        return back()->with('success', 'تم إنشاء الدولة.');
    }

    public function update(Request $request, Country $country)
    {
        $country->update($request->validate([
            'name' => 'required|json',
            'slug' => 'required|string|unique:countries,slug,' . $country->id,
            'code' => 'required|string|size:3|unique:countries,code,' . $country->id,
        ]));
        return back()->with('success', 'تم تحديث الدولة.');
    }

    public function destroy(Country $country)
    {
        $country->delete();
        return back()->with('success', 'تم حذف الدولة.');
    }
}

class AdminCategoriesController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'role_or_permission:access admin']);
    }

    public function index()
    {
        return Inertia::render('Admin/Categories/Index', [
            'categories' => Category::withCount('opportunities')->get(),
        ]);
    }

    public function store(Request $request)
    {
        Category::create($request->validate([
            'name' => 'required|json',
            'slug' => 'required|string|unique:categories',
        ]));
        return back()->with('success', 'تم إنشاء التصنيف.');
    }
}
