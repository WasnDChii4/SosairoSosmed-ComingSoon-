<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'channel_id',
        'user_id',
        'content',
    ];

    public function channel () {
        return $this->belongsTo(Channel::class);
    }

    public function user () {
        return $this->belongsTo(User::class);
    }
}
