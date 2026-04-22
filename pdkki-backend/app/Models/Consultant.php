<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Consultant extends Authenticatable
{
    use HasFactory, HasApiTokens;

    protected $fillable = [
        // Data Pribadi
        'name',
        'consultant_id',
        'registered_date',
        'birth_place',
        'birth_date',
        'gender',
        'religion',
        'id_number',
        'status',

        // Kantor
        'law_firm',
        'law_firm_province',
        'law_firm_city',
        'law_firm_address',
        'law_firm_phone',

        // Rumah
        'home_address',
        'home_phone',
        'personal_phone',

        // Korespondensi
        'correspondence_address',
        'correspondence_city',
        'correspondence_province',
        'correspondence_postal_code',
        'correspondence_phone',
        'email',

        // File
        'face_photo',
        'signature',
        'id_photo',
        'inactive_document',
        'inactive_reason',

        // Auth
        'password',
    ];

    protected $hidden = ['password'];

    protected $casts = [
        'password' => 'hashed',
        'birth_date' => 'date',
        'registered_date' => 'date',
    ];

    // Relationships
    public function education()
    {
        return $this->hasMany(ConsultantEducation::class);
    }

    public function achievements()
    {
        return $this->hasMany(ConsultantAchievement::class);
    }

    public function violations()
    {
        return $this->hasMany(ConsultantViolation::class);
    }
}
