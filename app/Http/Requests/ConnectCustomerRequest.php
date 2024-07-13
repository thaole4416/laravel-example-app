<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ConnectCustomerRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'affiliate_id' => 'required|exists:affiliates,id',
            'shopify_customer_id' => 'required|string',
        ];
    }
}
