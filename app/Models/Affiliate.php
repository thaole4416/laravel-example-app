<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Affiliate extends Model
{
    protected $fillable = ['name', 'email'];

    public function connectCustomers()
    {
        return $this->hasMany(ConnectCustomer::class);
    }
}
