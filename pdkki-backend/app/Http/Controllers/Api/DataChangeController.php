<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DataChange;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DataChangeController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'consultant_name'            => 'required|string',
            'consultant_number'          => 'required|string',
            'birth_place'                => 'nullable|string',
            'birth_date'                 => 'nullable|date',
            'religion'                   => 'nullable|string',
            'gender'                     => 'nullable|in:male,female',
            'law_firm'                   => 'nullable|string',
            'law_firm_address'           => 'nullable|string',
            'law_firm_province'          => 'nullable|string',
            'law_firm_city'              => 'nullable|string',
            'law_firm_phone'             => 'nullable|string',
            'home_address'               => 'nullable|string',
            'home_phone'                 => 'nullable|string',
            'personal_phone'             => 'nullable|string',
            'correspondence_address'     => 'nullable|string',
            'correspondence_city'        => 'nullable|string',
            'correspondence_province'    => 'nullable|string',
            'correspondence_postal_code' => 'nullable|string',
            'correspondence_phone'       => 'nullable|string',
            'email'                      => 'nullable|email',
            'changes_description'        => 'nullable|string',
            'face_photo'                 => 'nullable|image|max:2048',
            'signature'                  => 'nullable|image|max:2048',
        ]);

        // Handle file upload
        if ($request->hasFile('face_photo')) {
            $validated['face_photo'] = $request->file('face_photo')
                ->store('data-changes/photos', 'public');
        }

        if ($request->hasFile('signature')) {
            $validated['signature'] = $request->file('signature')
                ->store('data-changes/signatures', 'public');
        }

        $dataChange = DataChange::create($validated);

        return response()->json([
            'message' => 'Pengajuan berhasil dikirim.',
            'data'    => $dataChange,
        ], 201);
    }
}