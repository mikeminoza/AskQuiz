<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;

class QuizService
{
    public function createQuiz($user, array $data)
    {
        $quiz = $user->quizzes()->create([
            'title' => $data['title'],
            'description' => $data['description'],
            'category' => $data['category'],
            'is_public' => $data['is_public'],
            'status' => $data['status']
        ]);

        return ['quiz' => $quiz, 'message' => 'Quiz created successfully!'];
    }

    public function getQuiz($quiz)
    {
        return ['quiz' => $quiz, 'total' => $quiz->questions->count()];
    }

    public function updateQuiz($quiz, array $data)
    {
        $quiz->update($data);
        return ['quiz' => $quiz, 'total' => $quiz->questions->count(), 'message' => 'Quiz updated successfully!'];
    }

    public function deleteQuiz($quiz)
    {
        if (!$quiz || $quiz->user_id !== Auth::id()) {
            return null;
        }

        $quiz->delete();
        return ['message' => 'Quiz deleted successfully!'];
    }
}
