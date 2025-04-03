<?php

namespace App\Services;

class AttemptAnswerService
{
    public function createAttemptAnswer($quizAttempt, $question, array $data)
    {
        $attemptAnswer = $quizAttempt->attemptAnswers()->create([
            'option_id' => $data['option_id'],
            'is_correct' => $data['option_id'] === $this->getCorrectOptionId($question),
            'question_id' => $question->id,
        ]);
        return ['attemptAnswer' => $attemptAnswer, 'message' => 'Answer recorded successfully!'];
    }

    private function getCorrectOptionId($question)
    {
        return optional($question->options()->where('is_correct', true)->first())->id;
    }
}
