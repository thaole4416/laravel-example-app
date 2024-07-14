<?php

namespace App\Services;

use App\Models\Affiliate;
use Illuminate\Support\Facades\Auth;

class AffiliateService
{
    public function getAffiliates($search = null, $sort = null, $order = 'asc', $limit = 10)
    {
        $user = Auth::user();
        $query = Affiliate::where('shop_id', $user->id);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                  ->orWhere('email', 'like', '%' . $search . '%');
            });
        }

        if ($sort) {
            $query->orderBy($sort, $order);
        }

        return $query->paginate($limit);
    }
}
