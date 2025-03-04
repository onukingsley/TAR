<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = ['review','rating','user_id','driver_id'];

    public function User(){
        return $this->belongsTo(User::class,'user_id');
    }

    public function Driver(){
        return $this->belongsTo(Driver::class, 'driver_id');
    }


}
