<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Driver>
 */
class DriverFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'UUID' => $this->faker->uuid(),
            'license' => $this->faker->imei(),
            'liveAddress' => $this->faker->address(),
            'carImage' => $this->faker->imageUrl(),
            'carType' => $this->faker->company,
            'vehicleColor' => $this->faker->colorName(),
            'carSeat' => $this->faker->randomElement([4,6,5])
        ];
    }
}
