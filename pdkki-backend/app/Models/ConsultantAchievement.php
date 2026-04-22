<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConsultantAchievement extends Model
{
    protected $fillable = [
        'consultant_id',
        'title',
        'organizer',
        'date',
        'description',
        'certificate_file',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function consultant()
    {
        return $this->belongsTo(Consultant::class);
    }
}
