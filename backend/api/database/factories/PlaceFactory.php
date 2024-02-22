<?php

namespace Database\Factories;

use App\Models\Place;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Place>
 */
class PlaceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'namePlace' => $this->faker->words(2, true),
            'long' => $this->faker->longitude(90 , -90),
            'lat' => $this->faker->latitude(),
            'photoPlace' => $this->faker->imageUrl(null, 640, 480)
        ];
    }
}
