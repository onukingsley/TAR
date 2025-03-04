<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'UUID',
        'userType',
        'phone',
        'address'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function Driver(){
        return $this->hasOne(Driver::class);
    }

    public function Review(){
        return $this->hasMany(Review::class);
    }

    public function Complaint(){
        return $this->hasMany(Complaint::class);
    }

    public function DriverPayment(){
        return $this->hasMany(DriverPayment::class);
    }

    public function TarPayment(){
        return $this->hasMany(TarPayment::class);
    }

    public function TarToken(){
        return $this->hasMany(TarToken::class);
    }

    public function LiveLocation(){
        return $this->hasOne(LiveLocation::class);
    }

    public function Ride(){
        return $this->hasMany(Ride::class);
    }

    public function Notification(){
        return $this->hasMany(Notification::class);
    }

}
