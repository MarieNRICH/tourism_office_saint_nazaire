<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function currentUser()
    {
        return response()->json([
            'meta' => [
                'code' => 200,
                'status' => 'success',
                'message' => 'User fetched successfully!',
            ],
            'data' => [
                'user' => auth()->user(),
            ],
        ]);
    }

    public function index()
    {
        $user = User::all();
        return response()->json($user);
    }

    public function store(Request $request)
    {
        $request->validate([
            'username' => 'required|max:100',
            'email' => 'required|max:100',
            'password' => 'required|max:100',
        ]);

        $user = User::create($request->all());

        return response()->json([
            'status' => 'Success',
            'data' => $user,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // On retourne les informations de l'utilisateur en JSON
        return User::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'username' => 'required|max:100',
            'email' => 'required|max:100',
            'password' => 'required|max:100',
        ]);

        $user = User::find($id);
        $user->update($request->all());

        return response()->json([
            'status' => 'Mise à jour avec succèss'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();
        return response()->json([
            'status' => 'Supprimer avec succès'
        ]);
    }
}
