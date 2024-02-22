<?php

namespace Database\Factories;

use App\Models\Event;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence,
            'detail' => $this->faker->paragraph,
            'image' => $this->faker->imageUrl(null, 640, 480),
            'dateEvent' => $this->faker->dateTimeBetween('+1 week', '+1 month'),
            'status' => $this->faker->randomElement(['pending', 'approved', 'cancelled']),
            'place_id'  => $this->faker->numberBetween(1, 10),

        ];
    }
}
