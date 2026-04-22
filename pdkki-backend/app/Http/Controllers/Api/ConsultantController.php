<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Consultant;
use Illuminate\Http\Request;

class ConsultantController extends Controller
{
    // GET /api/v1/consultants
    public function index(Request $request)
    {
        $query = Consultant::query();

        // Search by name or consultant_id
        if ($request->search) {
            $query->where('name', 'like', "%{$request->search}%")
                  ->orWhere('consultant_id', 'like', "%{$request->search}%");
        }

        // Filter by province
        if ($request->province) {
            $query->where('law_firm_province', $request->province);
        }

        // Filter by status
        if ($request->status) {
            $query->where('status', $request->status);
        }

        // Filter by gender
        if ($request->gender) {
            $query->where('gender', $request->gender);
        }

        return response()->json(
            $query->paginate($request->per_page ?? 10)
        );
    }

    // GET /api/v1/consultants/{id}
    public function show($id)
    {
        $consultant = Consultant::with([
            'education',
            'achievements',
            'violations'
        ])->findOrFail($id);

        return response()->json($consultant);
    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'consultant_id' => 'required|unique:consultants,consultant_id',
        'law_firm_province' => 'required',
    ]);

    $consultant = Consultant::create($validated);

    return response()->json([
        'message' => 'Data berhasil disimpan',
        'data' => $consultant
    ], 201);
}
}