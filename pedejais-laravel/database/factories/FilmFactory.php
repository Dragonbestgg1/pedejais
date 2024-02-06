<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Film>
 */
class FilmFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'film_name' => $this->faker->word,
            'category' => $this->faker->word,
            'airing' => json_encode([$this->faker->date]),
            'lenght' => $this->faker->randomNumber(),
            'availabe_seats_id' => $this->faker->randomNumber(),
        ];
    }
    
}
