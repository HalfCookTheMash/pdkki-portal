<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DataChange extends Model
{
    protected $fillable = [
        'consultant_id',
        'consultant_name',
        'consultant_number',
        'birth_place',
        'birth_date',
        'religion',
        'gender',
        'law_firm',
        'law_firm_address',
        'law_firm_province',
        'law_firm_city',
        'law_firm_phone',
        'home_address',
        'home_phone',
        'personal_phone',
        'correspondence_address',
        'correspondence_city',
        'correspondence_province',
        'correspondence_postal_code',
        'correspondence_phone',
        'email',
        'changes_description',
        'face_photo',
        'signature',
        'status',
        'admin_notes',
    ];

    public function consultant()
    {
        return $this->belongsTo(Consultant::class);
    }
}
