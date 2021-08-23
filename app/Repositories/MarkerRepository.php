<?php

namespace App\Repositories;

use App\Http\Requests\MarkerRequest;
use App\Models\Map;
use App\Models\Marker;

class MarkerRepository implements Interfaces\MarkerRepository
{

    public function update(MarkerRequest $request, Map $map, Marker $marker)
    {
        $validatedData = $request->validated();

        $step = $validatedData['step'];
        $direction = $validatedData['direction'];

        $y = $marker->y;
        $x = $marker->x;

        switch ($direction) {
            case 1:
                // top
                $y += $step;
                if ($y > $map->height) {
                    $y = $map->height;
                }
                break;
            case 2:
                // right
                $x += $step;
                if ($x > $map->width) {
                    $x = $map->width;
                }
                break;
            case 3:
                // down
                $y -= $step;
                if (0 > $y) {
                    $y = 0;
                }
                break;
            case 4:
                // left
                $x -= $step;
                if (0 > $x) {
                    $x = 0;
                }
                break;
        }

        $marker->y = $y;
        $marker->x = $x;

        if (!$marker->save()) {
            throw new Exception("Can't change marker position!");
        }
    }
}
