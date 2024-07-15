<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ShopifyCustomerService
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client();
    }

    public function searchCustomers($shopName, $accessToken, $search, $limit = 20, $page = 1)
    {
        $cacheKey = $this->generateCacheKey($shopName, $search, $limit, $page);
        $cacheTime = 60;

        return Cache::remember($cacheKey, $cacheTime, function () use ($shopName, $accessToken, $search, $limit, $page) {
            $query = "query { customers(first: {$limit}, query: \"{$search}\", after: \"{$page}\") { edges { node { id firstName lastName name email } } } }";

            $response = $this->client->post("https://$shopName.myshopify.com/admin/api/2024-01/graphql.json", [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'X-Shopify-Access-Token' => $accessToken,
                ],
                'json' => [
                    'query' => $query,
                ],
            ]);

            $data = json_decode($response->getBody()->getContents(), true);

            if (isset($data['errors'])) {
                Log::error('GraphQL errors: ' . json_encode($data['errors']));
            }

            $customers = $data['data']['customers']['edges']; 
    
            return $customers;
        });
    }

    private function generateCacheKey($shopName, $query, $limit, $page)
    {
        return "shopify_customers_{$shopName}_{$query}_{$limit}_{$page}";
    }
}
