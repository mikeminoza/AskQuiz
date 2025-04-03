<?php

namespace App\Services;

use App\Models\Quiz;
use Illuminate\Support\Facades\Auth;

class QuestionService
{
    public function createQuestion($quiz, array $data)
    {
        $question = $quiz->questions()->create([
            'question_text' => $data['question_text'],
            'quiz_id' => $quiz->id
        ]);
        return ['question' => $question, 'message' => 'New Question added successfully!'];
    }

    public function updateQuestion($quiz, array $data)
    {
        $question = $quiz->questions()->update($data);
        return ['question' => $question, 'message' => 'Question updated successfully!'];
    }

    public function deleteQuestion($question)
    {
        if (!$question || $question->quiz->user_id !== Auth::id()) {
            return null;
        }
        $question->delete();
        return ['message' => 'Question updated successfully!'];
    }
}
