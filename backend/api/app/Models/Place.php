<?php

namespace App\Models;

use App\Models\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Place extends Model
{
    use HasFactory;
    protected $fillable = ['namePlace', 'longitudeLatitude', 'photoPlace'];

    public function events()
    {
        return $this->hasMany(Event::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
