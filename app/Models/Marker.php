<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Marker extends Model
{
    use HasFactory;

    protected $fillable = [
        'map_id',
        'x',
        'y',
    ];

    public function setRandomPosition(int $width, int $height)
    {
        $this->x = rand(1, $width);
        $this->y = rand(1, $height);
    }
}
