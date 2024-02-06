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
    public function get($id)
    {
        $stage = AvailableSeat::find($id);
    
        if ($stage === null) {
            return response()->json(['message' => 'Stage not found'], 404);
        } else {
            $stage->available_seats = json_decode($stage->available_seats); // Decode the JSON string into an array
            return response()->json($stage, 200);
        }
    }
    public function reserveSeats(Request $request, $id)
    {
        $stage = AvailableSeat::find($id);

        if ($stage === null) {
            return response()->json(['message' => 'Stage not found'], 404);
        }

        // Decode the JSON string into an array
        $takenSeats = json_decode($stage->taken_seats, true) ?? [];

        // Get the seats from the request
        $seatsToReserve = $request->input('seats');

        // Add the new seats to the taken seats
        $takenSeats = array_merge($takenSeats, $seatsToReserve);

        // Update the taken_seats field
        $stage->taken_seats = json_encode($takenSeats);

        $stage->save();

        return response()->json(['message' => 'Seats reserved successfully!'], 200);
    }

    
}
