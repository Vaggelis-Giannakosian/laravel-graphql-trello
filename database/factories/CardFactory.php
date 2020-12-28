<?php

namespace Database\Factories;

use App\Models\Card;
use App\Models\CardList;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CardFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Card::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title'=>$this->faker->title,
            'order'=> $this->faker->randomNumber(1),
            'list_id'=> function(){
                return CardList::factory()->create()->id;
            },
            'owner_id'=> function(){
                return User::factory()->create()->id;
            },
        ];
    }
}
