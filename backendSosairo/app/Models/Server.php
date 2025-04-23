<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Server extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'owner_id',
    ];

    public function owner () {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function channels () {
        return $this->hasMany(Channel::class);
    }
}
