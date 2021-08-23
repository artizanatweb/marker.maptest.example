<?php

namespace App\Repositories;

use App\Http\Requests\MapRequest;
use App\Models\Map;
use App\Models\Marker;
use \Exception;

class MapRepository implements Interfaces\MapRepository
{

    public function create(MapRequest $request)
    {
        $validatedData = $request->validated();

        $map = new Map();
        $this->fieldsToObject($map, $validatedData);
        $saved = $map->save();
        if (!$saved) {
            throw new Exception("Can't create map!");
        }

        $marker = new Marker();
        $marker->map_id = $map->id;
        $marker->setRandomPosition($validatedData['width'], $validatedData['height']);
        if (!$marker->save()) {
            throw new Exception("Can't create marker!");
        }

        return $map;
    }

    public function update(MapRequest $request, Map $map)
    {
        $validatedData = $request->validated();

        $this->fieldsToObject($map, $validatedData);
        $saved = $map->save();
        if (!$saved) {
            throw new Exception("Can't change map!");
        }

        $marker = $map->marker;
        $marker->setRandomPosition($validatedData['width'], $validatedData['height']);
        if (!$marker->save()) {
            throw new Exception("Can't change marker!");
        }
    }

    private function fieldsToObject(Map $map, array $validatedData)
    {
        if (isset($validatedData['width'])) {
            $map->width = $validatedData['width'];
        }

        if (isset($validatedData['height'])) {
            $map->height = $validatedData['height'];
        }
    }
}
