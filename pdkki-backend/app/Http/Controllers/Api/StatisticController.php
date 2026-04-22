<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Consultant;

class StatisticController extends Controller
{
    // GET /api/v1/statistics
    public function index()
    {
        return response()->json([
            'total'    => Consultant::count(),
            'active'   => Consultant::where('status', 'active')->count(),
            'inactive' => Consultant::where('status', 'inactive')->count(),
            'provinces' => Consultant::distinct('law_firm_province')->count('law_firm_province'),
        ]);
    }

    // GET /api/v1/statistics/provinces
    public function byProvince()
    {
        $data = Consultant::selectRaw('
            law_firm_province as province,
            COUNT(*) as total,
            SUM(CASE WHEN status = "active" THEN 1 ELSE 0 END) as active,
            SUM(CASE WHEN status = "inactive" THEN 1 ELSE 0 END) as inactive
        ')
        ->groupBy('law_firm_province')
        ->orderByDesc('total')
        ->get();

        return response()->json($data);
    }

    // GET /api/v1/statistics/gender
    public function byGender()
    {
        return response()->json([
            'male'   => Consultant::where('gender', 'male')->count(),
            'female' => Consultant::where('gender', 'female')->count(),
        ]);
    }
}