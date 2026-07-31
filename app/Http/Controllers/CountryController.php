<?php

namespace App\Http\Controllers;

use App\Models\Country;
use Illuminate\Http\Request;

class CountryController extends Controller
{
    public function search(Request $request)
    {
        $query = mb_strtolower(trim((string) $request->query('q', '')));

        $countries = Country::all()
            ->map(fn ($c) => ['name' => $this->localizedText($c->name), 'slug' => $c->slug])
            ->filter(fn ($c) => $c['name'] !== '' && ($query === '' || str_contains(mb_strtolower($c['name']), $query)))
            ->sortBy('name', SORT_NATURAL | SORT_FLAG_CASE)
            ->values()
            ->take(20);

        return response()->json($countries);
    }
}
