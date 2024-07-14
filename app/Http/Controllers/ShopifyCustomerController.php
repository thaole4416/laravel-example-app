<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ShopifyGraphQLService;
use Illuminate\Support\Facades\Auth;

class ShopifyCustomerController extends Controller
{
    protected $graphQLService;

    public function __construct(ShopifyGraphQLService $graphQLService)
    {
        $this->graphQLService = $graphQLService;
    }

    public function search(Request $request)
    {
        $user = Auth::user();

        $query = '
            query ($first: Int, $query: String) {
                customers(first: $first, query: $query) {
                    edges {
                        node {
                            id
                            firstName
                            lastName
                            email
                        }
                    }
                }
            }
        ';

        $variables = [
            'first' => $request->input('limit', 10),
            'query' => $request->input('search', ''),
        ];

        $result = $this->graphQLService->searchCustomers($user->shop_name, $user->shopify_access_token, $query, $variables);
   
        return response()->json($result);
    }
}
