<?php

namespace App\Repositories\Interfaces;
use App\Http\Requests\MapRequest;
use App\Models\Map;

interface MapRepository
{
    public function create(MapRequest $request);

    public function update(MapRequest $request, Map $map);
}
