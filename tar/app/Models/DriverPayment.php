<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DriverPayment extends Model
{
    use HasFactory;

    protected $fillable = ['transactionId','user_id','driver_id','amount'];

    public function User(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function Driver(){
        return $this->belongsTo(Driver::class, 'driver_id');
    }
}
