<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\activities;

class ActivitiesController extends Controller
{

    public function index()
    {
        $activities = activities::all();
        return response()->json($activities);
    }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'activity_name' => 'required|max:255',
            'date' => 'required|date',
            'availabe_seats_id' => 'required|integer',
        ]);

        $activity = activities::create($validatedData);

        return response()->json($activity, 201);
    }
}
