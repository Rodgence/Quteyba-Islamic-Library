<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Support\Facades\Storage;

class MediaController extends Controller
{
    public function destroy(Media $medium)
    {
        Storage::disk($medium->disk ?? 'public')->delete($medium->path);
        $medium->delete();

        return back()->with('success', 'Media deleted.');
    }
}
