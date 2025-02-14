<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $query = Task::query();

        if ($request->has('category_id')) {
            $query->where('category_id', $request->query('category_id'));
        }

        if ($request->has('status')) {
            $query->where('status', $request->query('status'));
        }

        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $task = Task::create($request->validate([
            'project_id' => 'required|exists:projects,id',
            'category_id' => 'nullable|exists:categories,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:pending,in_progress,completed',
            'due_date' => 'nullable|date',
        ]));

        return response()->json($task, 201);
    }

    public function markAsCompleted(Task $task)
    {
        $task->update(['status' => 'completed']);
        return response()->json($task);
    }
}
