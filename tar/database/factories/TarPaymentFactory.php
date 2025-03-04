<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TarPayment>
 */
class TarPaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $amount = $this->faker->numberBetween(1,100);
        return [
            'transactionId' => $this->faker->imei,
            'tarToken' => $amount/100,
            'amount' => $amount
        ];
    }
}
