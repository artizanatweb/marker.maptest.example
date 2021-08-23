<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Traits\ResourceResponder;
use App\Http\Resources\MarkerResource;

class MapResource extends JsonResource
{
    use ResourceResponder;

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'width' => (string) $this->width,
            'height' => (string) $this->height,
            'marker' => new MarkerResource($this->marker),
        ];
    }
}
