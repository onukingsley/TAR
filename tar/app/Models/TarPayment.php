<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TarPayment extends Model
{
    use HasFactory;

    protected $fillable = ['transactionId','user_id','tarToken', 'amount'];

    public function User(){
        return $this->belongsTo(User::class, 'user_id');
    }
}
