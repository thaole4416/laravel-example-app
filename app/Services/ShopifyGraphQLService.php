<?php

namespace App\Services;

use GuzzleHttp\Client;

class ShopifyGraphQLService
{
    protected $client;

    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    public function searchCustomers($query)
    {
        $response = $this->client->post('https://your-shopify-store.myshopify.com/admin/api/2023-07/graphql.json', [
            'json' => [
                'query' => <<<GRAPHQL
                query {
                    customers(query: "$query") {
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
                GRAPHQL
            ]
        ]);

        return json_decode($response->getBody()->getContents(), true)['data']['customers']['edges'];
    }
}
