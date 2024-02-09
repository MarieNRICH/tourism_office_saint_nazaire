<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Place;
use Illuminate\Http\Request;

class PlaceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $place = Place::all();
        return response()->json($place);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'namePlace' => 'required|max:100',
            'longitudeLatitude' => 'required',
        ]);

        $place = Place::create($request->all());
        return response()->json([
            'status' => 'Success',
            'data' => $place,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Place $place)
    {
        return response()->json($place);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Place $place)
    {
        $this->validate($request, [
            'namePlace' => 'required|max:100',
            'longitudeLatitude' => 'required',
        ]);

        $place->update($request->all());

        return response()->json([
            'status' => 'Mise à jour avec succès',
            'data' => $place,
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Place $place)
    {
        $place->delete();
        return response()->json([
            'status' => 'Supprimer avec succès'
        ]);
    }
}
