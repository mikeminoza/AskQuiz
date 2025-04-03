<?php

namespace App\Http\Controllers;

use App\Http\Requests\QuestionRequest;
use App\Models\Question;
use App\Models\Quiz;
use App\Services\QuestionService;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    public function __construct(protected QuestionService $questionService)
    {
    }

    public function show(Question $question)
    {
        return response()->json(['question' => $question]);
    }

    public function store(Quiz $quiz, QuestionRequest $request)
    {
        $data = $this->questionService->createQuestion($quiz, $request->validated());
        return response()->json($data, 201);
    }

    public function update(Quiz $quiz, QuestionRequest $request)
    {
        $data = $this->questionService->updateQuestion($quiz, $request->validated());
        return response()->json($data, 201);
    }

    public function destroy(Question $question)
    {
        $data = $this->questionService->deleteQuestion($question);
        if (!$data) {
            return response()->json(['message' => 'Unable to process request'], 401);
        }
        return response()->json($data, 200);
    }
}
