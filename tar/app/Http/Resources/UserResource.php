<?php

namespace App\Http\Resources;

use App\Models\Driver;
use App\Models\DriverPayment;
use App\Models\TarPayment;
use App\Models\TarToken;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'email' => $this->email,
            'UUID' => $this->UUID,
            'userType' => $this->userType,
            'phone' => $this->phone,
            'address' => $this->address,
            'driver' => new DriverResource($this->whenLoaded('Driver')),
            'location' => new DriverResource($this->whenLoaded('LiveLocation')),
            'TarPayment' => TarPaymentResource::collection($this->whenLoaded('TarPayment')),
            'TarToken' => TarTokenResource::collection($this->whenLoaded('TarToken')),
            'Ride' => RideResource::collection($this->whenLoaded('Ride')),
            'DriverPayment' => DriverPaymentResource::collection($this->whenLoaded('DriverPayment'))
        ];
    }
}
