<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LiveLocation extends Model
{
    use HasFactory;

    protected $fillable = ['latitude','longitude','user_id'];

    public function User(){
        return $this->belongsTo(User::class, 'user_id');
    }


}
