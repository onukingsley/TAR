<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
    use HasFactory;

    protected $fillable = ['UUID','user_id','liveAddress','license','vehicleColor','profileImage','carImage','carType','carSeat'];

    public function User(){
        return $this->belongsTo(User::class,'user_id');
    }

    public function Review(){
        return $this->hasMany(Review::class);
    }

    public function DriverPayment(){
        return $this->hasMany(DriverPayment::class);
    }

    public function LiveLocation(){
        return $this->hasOne(TarToken::class);
    }

    public function Ride(){
        return $this->hasMany(Ride::class);
    }



}
