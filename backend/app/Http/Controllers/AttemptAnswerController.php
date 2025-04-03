<?php

namespace App\Http\Controllers;

use App\Http\Requests\AttemptAnswerRequest;
use App\Models\Question;
use App\Models\QuizAttempt;
use App\Services\AttemptAnswerService;
use Illuminate\Http\Request;

class AttemptAnswerController extends Controller
{
    public function __construct(protected AttemptAnswerService $attemptAnswerService)
    {
    }

    public function store(QuizAttempt $quizAttempt, Question $question, AttemptAnswerRequest $request)
    {
        $data = $this->attemptAnswerService->createAttemptAnswer($quizAttempt, $question, $request->validated());
        return response()->json($data, 201);
    }

}
