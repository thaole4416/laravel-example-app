<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;

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
            'customer_name' => 'required|string',
            'customer_email' => 'required|string',
            'affiliate_id' => [
                'required',
                'exists:affiliates,id',
                function ($attribute, $value, $fail) {
                    if ($this->shopify_customer_id) {
                        $exists = DB::table('connect_customers')
                            ->where('affiliate_id', $value)
                            ->where('shopify_customer_id', $this->shopify_customer_id)
                            ->exists();
                        if ($exists) {
                            $fail('The combination of affiliate_id and shopify_customer_id must be unique.');
                        }
                    }
                },
            ],
        ];
    }

    public function messages()
    {
        return [
            'affiliate_id.required' => 'The affiliate ID is required.',
            'affiliate_id.exists' => 'The selected affiliate ID is invalid.',
            'shopify_customer_id.required' => 'The Shopify customer ID is required.',
            'customer_name.required' => 'The customer name is required.',
            'customer_name.string' => 'The customer name must be a string.',
            'customer_name.max' => 'The customer name may not be greater than 255 characters.',
            'customer_email.required' => 'The customer email is required.',
            'customer_email.email' => 'The customer email must be a valid email address.',
            'customer_email.max' => 'The customer email may not be greater than 255 characters.',
        ];
    }
}
