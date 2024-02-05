<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function show(string $id)
    {
        $user = User::find($id);
        if ($user) {
            return response()->json($user);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }

    public function update(Request $request, string $id)
    {
        $user = User::find($id);
        if ($user) {
            if ($request->has('name')) {
                $user->name = $request->input('name');
            }
            if ($request->has('surname')) {
                $user->surname = $request->input('surname');
            }
            if ($request->has('password')) {
                $user->password = Hash::make($request->input('password'));
            }
            if ($request->has('city')) {
                $user->city = $request->input('city');
            }
            if ($request->has('email')) {
                $user->email = $request->input('email');
            }
            if ($request->has('phoneNumber')) {
                $user->phoneNumber = $request->input('phoneNumber');
            }
            $user->save();
            return response()->json($user);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }
    
}
