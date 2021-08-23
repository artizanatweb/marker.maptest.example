<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Map extends Model
{
    use HasFactory;

    protected $fillable = [
        'width',
        'height',
    ];

    public function marker()
    {
        return $this->hasOne(Marker::class, "map_id", "id");
    }
}
