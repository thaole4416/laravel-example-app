<?php

// app/Services/GraphQLService.php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class ShopifyGraphQLService
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client();
    }

    public function query($shopName, $accessToken, $query, $variables = [])
    {
        $response = $this->client->post("https://$shopName.myshopify.com/admin/api/2024-01/graphql.json", [
            'headers' => [
                'Content-Type' => 'application/json',
                'X-Shopify-Access-Token' => $accessToken,
            ],
            'json' => [
                'query' => $query,
                'variables' => $variables,
            ],
        ]);

        $data = json_decode($response->getBody()->getContents(), true);

        if (isset($data['errors'])) {
            Log::error('GraphQL errors: ' . json_encode($data['errors']));
        }

        return $data;
    }

    public function searchCustomers($shopName, $accessToken, $query, $variables = [])
    {
        $result = $this->query($shopName,  $accessToken, $query, $variables);

        $customers = collect($result['data']['customers']['edges'])->map(function ($edge) {
            return [
                'id' => str_replace('gid://shopify/Customer/', '', $edge['node']['id']),
                'name' => $edge['node']['firstName'] . ' ' . $edge['node']['lastName'],
                'email' => $edge['node']['email']
            ];
        });

        return $customers;
    }
}
