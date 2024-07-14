<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConnectCustomer extends Model
{
    protected $fillable = [
        'affiliate_id', 
        'shopify_customer_id', 
        'customer_name', 
        'customer_email'
    ];
    
    public function affiliate()
    {
        return $this->belongsTo(Affiliate::class);
    }
}
