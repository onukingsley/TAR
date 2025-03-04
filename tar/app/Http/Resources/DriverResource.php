<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DriverResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'UUID' => $this->UUID,
            'user_id' => $this->user_id,
            'license' => $this->license,
            'liveAddress' => $this->address,
            'vehicleColor' => $this->vehicleColor,
            'profileImage' => $this->profileImage,
            'carImage' => $this->carImage,
            'carType' => $this->carType,
            'carSeat' => $this->carseat,
            'user' => new UserResource($this->whenLoaded('user'))
        ];
    }
}
