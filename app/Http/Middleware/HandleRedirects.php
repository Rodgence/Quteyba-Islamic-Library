<?php

namespace App\Http\Middleware;

use App\Models\Redirect;
use Closure;
use Illuminate\Http\Request;

class HandleRedirects
{
    public function handle(Request $request, Closure $next)
    {
        $path = '/' . trim($request->path(), '/');

        $redirect = Redirect::where('is_active', true)
            ->where('from_url', $path)
            ->first();

        if ($redirect) {
            $redirect->increment('hit_count');
            $redirect->update(['last_hit_at' => now()]);

            return redirect($redirect->to_url, $redirect->status_code);
        }

        return $next($request);
    }
}
