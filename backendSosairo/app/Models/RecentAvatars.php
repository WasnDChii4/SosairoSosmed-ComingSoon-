<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecentAvatars extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'path'];

    public function avatars()
    {
        return $this->hasMany(RecentAvatars::class);
    }
}
