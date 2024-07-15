<?php

namespace App\Http\Controllers;

use App\Http\Resources\ShopifyCustomerResource;
use Illuminate\Http\Request;
use App\Services\ShopifyCustomerService;
use Illuminate\Support\Facades\Auth;

class ShopifyCustomerController extends Controller
{
    protected $shopifyCustomerService;

    public function __construct(ShopifyCustomerService $shopifyCustomerService)
    {
        $this->shopifyCustomerService = $shopifyCustomerService;
    }

    public function search(Request $request)
    {
        $user = Auth::user();

        $shopName = $user->shop_name;
        $accessToken = $user->shopify_access_token;
        $search = $request->input('search', '');
        $limit = $request->input('limit', 20);
        $page = $request->input('page', 1);
        

        $result = $this->shopifyCustomerService->searchCustomers($shopName, $accessToken, $search, $limit, $page);
   
        return new ShopifyCustomerResource($result);
    }
}
