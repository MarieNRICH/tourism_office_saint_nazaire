<?php

namespace App\Models;

use App\Models\Place;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Event extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'detail', 'image', 'dateEvent', 'status', 'place_id'];

    public function place()
    {
        return $this->belongsTo(Place::class);
    }
}
