<?php

namespace App\Repositories\Interfaces;
use App\Models\Marker;
use App\Models\Map;
use App\Http\Requests\MarkerRequest;

interface MarkerRepository
{
    public function update(MarkerRequest $request, Map $map, Marker $marker);
}
