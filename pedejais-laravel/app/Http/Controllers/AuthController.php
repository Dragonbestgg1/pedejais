<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('name', 'password');
    
        if (Auth::attempt($credentials)) {
            // Get the authenticated user
            $user = Auth::user();
    
            // Return the user ID and privilege in the response
            return response()->json([
                'status' => 'success', 
                'message' => 'Login successful', 
                'userId' => $user->id,
                'privilage' => $user->privilage 
            ]);
        } else {
            return response()->json(['status' => 'error', 'message' => 'Invalid name or password'], 401);
        }
    }
    
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'surname' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
            'birthDate' => 'required|integer',
            'birthMonth' => 'required|integer',
            'birthYear' => 'required|integer',
            'city' => 'nullable', 
            'phoneNumber' => 'nullable'
        ]);
    
        $user = new User;
        $user->name = $request->name;
        $user->surname = $request->surname;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->birthDate = $request->birthDate;
        $user->birthMonth = $request->birthMonth;
        $user->birthYear = $request->birthYear;
        $user->city = $request->city;
        $user->phoneNumber = $request->phoneNumber;
        $user->save();
        $token = $user->createToken('authToken')->accessToken;

        return response()->json([
            'message' => 'User registered successfully', 
            'token' => $token, 
            'userId' => $user->id,
            'privilege' => $user->privilege,
            'name' => $user->name  // Add this line
        ], 200);        
    }
}
