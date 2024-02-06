<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Film extends Model
{
    use HasFactory;

    protected $fillable = ['film_name', 'category', 'airing', 'lenght', 'availabe_seats_id', 'price', 'imageURL']; // Add 'price' and 'imageURL'
}
