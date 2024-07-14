<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AffiliateSearchRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'sort' => 'nullable|string|in:name,email,created_at',
            'order' => 'nullable|string|in:asc,desc',
            'search' => 'nullable|string|max:255',
            'limit' => 'nullable|integer|min:1|max:100',
        ];
    }
}
