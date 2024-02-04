<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Film;

class FilmController extends Controller
{
    public function index()
    {
        $films = Film::all();
        return response()->json($films);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'film_name' => 'required|max:255',
            'category' => 'required|max:255',
            'airing' => 'required|array',
            'length' => 'required|integer',
            'availabe_seats_id' => 'required|integer',
        ]);
    
        $film = Film::create($validatedData);
    
        foreach ($validatedData['airing'] as $date) {
            AiringDate::create([
                'film_id' => $film->id,
                'date' => $date,
            ]);
        }
    
        return response()->json($film, 201);
    }
    
}
