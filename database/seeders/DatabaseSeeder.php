<?php

namespace Database\Seeders;

use App\Models\Board;
use App\Models\Card;
use App\Models\CardList;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $users = User::factory()->count(10)->create();

        $board1 = Board::factory()->create([
            'title' => 'Groceries',
            'color' => 'teal',
            'owner_id' => 1
        ]);

        $board2 = Board::factory()->create([
            'title' => 'Work',
            'color' => 'orange',
            'owner_id' => 2
        ]);

        $board3 = Board::factory()->create([
            'title' => 'Hobby',
            'color' => 'indigo',
            'owner_id' => 1
        ]);

        collect([$board1, $board2, $board3])->each(function (Board $board) {

            $list1 = CardList::factory()->create([
                'title' => 'To-Do',
                'board_id' => $board->id
            ]);

            $list2 = CardList::factory()->create([
                'title' => 'In progress',
                'board_id' => $board->id
            ]);

            $list3 = CardList::factory()->create([
                'title' => 'Done',
                'board_id' => $board->id
            ]);

            collect([$list1, $list2, $list3])->each(function (CardList $list) use ($board) {

                $order = 1;

                collect([
                    'Buy groceries',
                    'Take the dog for a walk',
                    'Pay the bills',
                    'Get the car fixed',
                    'Write novel',
                    'Buy food',
                    'Paint a picture',
                    'Create a course'
                ])->random(random_int(2, 5))->each(function (string $task) use ($board, $list, &$order) {
                    Card::factory()->create([
                        'title' => $task,
                        'list_id' => $list->id,
                        'owner_id' => $board->owner_id,
                        'order'=> $order++
                    ]);
                });

            });

        });

    }
}
