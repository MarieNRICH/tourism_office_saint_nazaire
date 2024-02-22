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


        $filename = "";
        if ($request->hasFile('photoPlace')) {
            $filenameWithExt = $request->file('photoPlace')->getClientOriginalName();
            $filenameWithoutExt = pathinfo($filenameWithExt, PATHINFO_FILENAME);
            $extension = $request->file('photoPlace')->getClientOriginalExtension();
            $filename = $filenameWithoutExt . '_' . time() . '.' . $extension;
            $path = $request->file('photoPlace')->storeAs('public/uploads', $filename);
        } else {
            $filename = Null;
        }


        $place = Place::create(array_merge($request->all(), ['photoPlace' => $filename]));

        return response()->json([
            'status' => 'Success',
            'data' => $place,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // dd($id);
        return Place::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'namePlace' => 'required|max:100',
            'longitudeLatitude' => 'required',
        ]);

        $place = Place::find($id);
        $place->update($request->all());

        return response()->json([
            'status' => 'Mise à jour avec succès',
            'data' => $place,
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $place = Place::find($id);
        $place->delete();
        return response()->json([
            'status' => 'Supprimer avec succès'
        ]);
    }
}
