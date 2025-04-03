<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = [
        'question_text',
        'quiz_id'
    ];

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }

    public function options()
    {
        return $this->hasMany(Option::class);
    }

    public function quizAttempt()
    {
        return $this->hasMany(QuizAttempt::class);
    }

    public function attemptAnswers()
    {
        return $this->hasMany(AttemptAnswer::class);
    }
}
