<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $category = Category::all();
        return response()->json($category);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:100',
        ]);

        $category = Category::create($request->all());

        return response()->json([
            'status' => 'Success',
            'data' => $category,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // On retourne les informations de l'utilisateur en JSON
        return Category::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'required|max:100',
        ]);

        $category = Category::find($id);
        // dd($category);
        $category->update($request->all());

        return response()->json([
            'status' => 'Mise à jour avec succèss'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        // $category = Category::find($id);
        $category->delete();
        return response()->json([
            'status' => 'Supprimer avec succès'
        ]);
    }
}
