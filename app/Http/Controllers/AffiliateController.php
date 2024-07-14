<?php

namespace App\Http\Controllers;

use App\Http\Requests\AffiliateSearchRequest;
use App\Models\Affiliate;
use App\Services\AffiliateService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AffiliateController extends Controller
{
    protected $affiliateService;

    public function __construct(AffiliateService $affiliateService)
    {
        $this->affiliateService = $affiliateService;
    }

    public function index(AffiliateSearchRequest $request)
    {
        $affiliates = $this->affiliateService->getAffiliates(
            $request->input('search'),
            $request->input('sort'),
            $request->input('order', 'asc'),
            $request->input('limit', 10)
        );

        return response()->json($affiliates);
    }
}
