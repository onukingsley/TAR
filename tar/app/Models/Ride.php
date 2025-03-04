<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ride extends Model
{
    use HasFactory;

    protected $fillable = ['user_id','driver_id','distance','originAddress','destinationAddress','originLongitude','originLatitude','destinationLongitude','destinationLatitude','rideTime','price','status'];

    public function User(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function Driver(){
        return $this->belongsTo(Driver::class, 'driver_id');
    }


}
