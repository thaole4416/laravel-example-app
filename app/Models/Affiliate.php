<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Affiliate extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'email', 'shop_id'];

    public function shop()
    {
        return $this->belongsTo(User::class, 'shop_id');
    }
}
