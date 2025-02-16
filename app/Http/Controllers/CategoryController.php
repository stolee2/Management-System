<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        return response()->json($categories);
    }



    public function store(Request $request)
    {
        $category = Category::create($request->validate([
            'name' => 'required|string|max:255|unique:categories',
        ]));

        return response()->json($category, 201);
    }
}
