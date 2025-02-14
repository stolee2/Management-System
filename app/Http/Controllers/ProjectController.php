<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Project;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::all();
        return response()->json($projects);
    }

    public function store(Request $request)
    {
        $project = Project::create($request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
        ]));

        return response()->json($project, 201);
    }

    public function filterByDueDate(Request $request)
    {
        $projects = Project::whereDate('due_date', $request->query('due_date'))->get();
        return response()->json($projects);
    }
}
