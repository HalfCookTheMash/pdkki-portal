<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConsultantEducation extends Model
{
    protected $table = 'consultant_educations';    

    protected $fillable = [
        'consultant_id',
        'degree',
        'major',
        'university',
        'graduation_date',
        'diploma_file',
    ];

    protected $casts = [
        'graduation_date' => 'date',
    ];

    public function consultant()
    {
        return $this->belongsTo(Consultant::class);
    }
}
