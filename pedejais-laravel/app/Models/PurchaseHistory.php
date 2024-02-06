<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'ticket_id',
        'film_id',
        'activity_id',
        'price',
        'date_aired',
        'payment_status',
        'refunded'
    ];
}
