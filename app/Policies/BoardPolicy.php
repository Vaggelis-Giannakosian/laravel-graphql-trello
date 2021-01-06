<?php

namespace App\Policies;

use App\Models\Board;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class BoardPolicy
{
    use HandlesAuthorization;


    public function view(User $user, Board $board)
    {
        return $user->id === $board->owner_id;
    }

    public function delete(User $user, Board $board)
    {
        return $user->id === $board->owner_id;
    }

    public function createList(User $user, Board $board)
    {
        return $user->id === $board->owner_id;
    }
}
