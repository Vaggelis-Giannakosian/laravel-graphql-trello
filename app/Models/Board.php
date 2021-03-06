<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Board extends Model
{
    use HasFactory;

    protected $guarded = [];


    protected static function booted()
    {
        parent::booted(); // TODO: Change the autogenerated stub

        static::creating(function (Board $board) {
            if (auth()->check()) {
                $board->owner_id = auth()->id();
            }
        });
    }

    public function lists(): HasMany
    {
        return $this->hasMany(CardList::class);
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

}
