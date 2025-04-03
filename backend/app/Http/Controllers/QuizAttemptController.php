<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\QuizAttempt;
use App\Services\QuizAttemptService;
use Illuminate\Http\Request;

class QuizAttemptController extends Controller
{
    public function __construct(protected QuizAttemptService $quizAttemptService)
    {
    }
    public function store(Quiz $quiz)
    {
        $data = $this->quizAttemptService->createQuizAttempt($quiz);
        if (!$data) {
            return response()->json(['message' => 'Quiz is not available right now.'], 403);
        }
        return response()->json($data, 201);
    }

    public function destroy(QuizAttempt $quizAttempt)
    {
        $data = $this->quizAttemptService->deleteQuizAttempt($quizAttempt);
        if (!$data) {
            return response()->json(['Unable to process request'], 401);
        }
        return response()->json($data, 200);
    }
}
