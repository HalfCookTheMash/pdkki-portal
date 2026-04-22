<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConsultantViolation extends Model
{
    protected $fillable = [
        'consultant_id',
        'type',
        'date',
        'description',
        'evidence_file',
        'sanction',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function consultant()
    {
        return $this->belongsTo(Consultant::class);
    }
}
