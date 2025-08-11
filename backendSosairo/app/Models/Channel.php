<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Channel extends Model
{
    use HasFactory;

    protected $fillable = [
        'server_id',
        'name',
        'type',
        'category_id',
        'position'
    ];

    public function server () {
        return $this->belongsTo(Server::class);
    }

    public function messages () {
        return $this->hasMany(Message::class);
    }

    public function category() {
        return $this->belongsTo(Category::class);
    }
}
