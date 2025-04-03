<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;

class QuizAttemptService
{
    public function createQuizAttempt($quiz)
    {
        if (!$this->checkQuizStatus($quiz)) {
            return null;
        }
        $quizAttempt = $quiz->quizAttempt()->create([
            'status' => 'pending',
            'user_id' => Auth::id(),
        ]);
        return ['attempt' => $quizAttempt];
    }

    public function deleteQuizAttempt($quizAttempt)
    {
        if (!$quizAttempt || $quizAttempt->user_id !== Auth::id()) {
            return null;
        }
        $quizAttempt->delete();
        return ['message' => 'Quiz Attempt deleted successfully!'];
    }

    private function checkQuizStatus($quiz)
    {
        return $quiz->status === "published";
    }
}
