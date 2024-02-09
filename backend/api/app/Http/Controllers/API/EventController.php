<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $event = Event::all();
        return response()->json($event);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|max:100',
            'detail' => 'required',
            'dateEvent' => 'required',
            'status' => 'required',
        ]);

        $event = Event::create($request->all());
        return response()->json([
            'status' => 'Success',
            'data' => $event,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return Event::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'title' => 'required|max:100',
            'detail' => 'required',
            'dateEvent' => 'required',
            'status' => 'required',
        ]);

        $event = Event::find($id);
        $event->update($request->all());

        return response()->json([
            'status' => 'Mise à jour avec succès'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $event = Event::find($id);
        $event->delete();
        return response()->json([
            'status' => 'Supprimer avec succès'
        ]);
    }
}
