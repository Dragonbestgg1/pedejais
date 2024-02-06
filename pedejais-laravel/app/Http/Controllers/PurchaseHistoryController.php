<?php

namespace App\Http\Controllers;

use App\Models\PurchaseHistory;
use Illuminate\Http\Request;

class PurchaseHistoryController extends Controller
{
    public function store(Request $request)
    {
        $purchase = PurchaseHistory::create([
            'user_id' => $request->user_id,
            'ticket_id' => $request->ticket_id,
            'film_id' => $request->film_id,
            'activity_id' => $request->activity_id,
            'price' => $request->price,
            'date_aired' => $request->date_aired, // You'll need to determine how to get this
            'payment_status' => 'done',
            'refunded' => null,
        ]);

        return response()->json(['message' => 'Purchase history created successfully!', 'purchase' => $purchase], 201);
    }
}
