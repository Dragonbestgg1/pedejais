<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Film;

class FilmController extends Controller
{
    public function index()
    {
        $films = Film::all();
    
        foreach($films as $id => $film) {
            $films[$id]->airing = json_decode($film->airing);
        }
    
        return response()->json($films);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'film_name' => 'required|max:255',
            'category' => 'required|max:255',
            'airing' => 'required|array',
            'lenght' => 'required|numeric', 
            'availabe_seats_id' => 'required|integer',
            'price' => 'required|regex:/^\d+(\.\d{1,2})?$/',
            'imageURL' => 'required|url'
        ]);

        // Convert the airing dates array to a JSON string
        $validatedData['airing'] = json_encode($validatedData['airing']);

        // Convert the length from time string to seconds and then to a string
        if (is_numeric($validatedData['lenght'])) {
            $hours = floor($validatedData['lenght'] / 3600);
            $minutes = floor(($validatedData['lenght'] % 3600) / 60);
            $seconds = $validatedData['lenght'] % 60;
        } else {
            list($hours, $minutes, $seconds) = explode(':', $validatedData['lenght']);
        }
        
        
        $validatedData['lenght'] = strval($hours * 3600 + $minutes * 60 + $seconds);

        $film = Film::create($validatedData);

        return response()->json(['id' => $film->id], 201);
    }
}
