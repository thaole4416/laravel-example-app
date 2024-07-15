<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ShopifyCustomerResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => str_replace('gid://shopify/Customer/', '', $this->node->id),
            'name' => $this->node->first_name.' '.$this->node->last_name,
            'email' => $this->node->email,
        ];
    }
}