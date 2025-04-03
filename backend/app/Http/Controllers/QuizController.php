<?php

namespace App\Http\Controllers;

use App\Http\Requests\QuizRequest;
use App\Models\Quiz;
use App\Services\QuizService;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    public function __construct(protected QuizService $quizService)
    {

    }

    public function store(QuizRequest $request)
    {
        $data = $this->quizService->createQuiz($request->user(), $request->validated());
        return response()->json($data, 201);
    }

    public function show(Quiz $quiz)
    {
        $data = $this->quizService->getQuiz($quiz);
        return response()->json($data, 200);
    }

    public function update(Quiz $quiz, QuizRequest $request)
    {
        $data = $this->quizService->updateQuiz($quiz, $request->validated());
        return response()->json($data, 200);
    }

    public function destroy(Quiz $quiz)
    {
        $data = $this->quizService->deleteQuiz($quiz);
        if (!$data) {
            return response()->json(['message' => 'Unable to process request!'], 400);
        }

        return response()->json($data, 200);
    }
}
