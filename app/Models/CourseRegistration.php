<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseRegistration extends Model
{
    protected $fillable = [
        'course_id', 'name', 'email', 'phone',
        'admin_notes', 'status', 'ip_address',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
