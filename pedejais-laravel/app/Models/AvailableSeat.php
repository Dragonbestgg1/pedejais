<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AvailableSeat extends Model
{
    use HasFactory;

    public $timestamps = false; // Add this line

    protected $fillable = ['max_seats', 'available_seats', 'taken_seats', 'stage'];
}
