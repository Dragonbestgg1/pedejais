<?php

namespace App\Http\Controllers;

use App\Models\AvailableSeat;
use Illuminate\Http\Request;

class AvailableSeatController extends Controller
{
    public function add(Request $request)
    {
        $stage = new AvailableSeat;
        $stage->max_seats = $request->input('max_seats');
        $stage->available_seats = json_encode(range(1, $request->input('max_seats'))); // Encode the array into a JSON string
        $stage->taken_seats = null; // taken_seats is null
        $stage->stage = $request->input('stage');
        
        $stage->save();
        
        return response()->json(['message' => 'Stage added successfully!'], 201);
    }
    public function getAll()
    {
        $stages = AvailableSeat::all();

        if ($stages->isEmpty()) {
            return response()->json(['message' => 'No stages found'], 404);
        } else {
            return response()->json($stages, 200);
        }
    }

    
}
