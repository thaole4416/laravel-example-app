<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ShopifyGraphQLService;

class ShopifyCustomerController extends Controller
{
    protected $shopifyGraphQLService;

    public function __construct(ShopifyGraphQLService $shopifyGraphQLService)
    {
        $this->shopifyGraphQLService = $shopifyGraphQLService;
    }

    public function search(Request $request)
    {
        $query = $request->input('query');
        
        $customers = $this->shopifyGraphQLService->searchCustomers($query);

        return response()->json($customers);
    }
}
