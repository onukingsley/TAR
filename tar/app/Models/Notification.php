<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = ['user_id','message','viewed'];

    public function User(){
        return $this->belongsTo(User::class, 'user_id');
    }
}
