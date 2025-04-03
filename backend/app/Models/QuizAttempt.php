<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuizAttempt extends Model
{
    protected $fillable = [
        'score',
        'started_at',
        'completed_at',
        'status',
        'user_id',
        'quiz_id',
        'question_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }

    public function currentQuestion()
    {
        return $this->belongsTo(Question::class);
    }

    public function attemptAnswers()
    {
        return $this->hasMany(AttemptAnswer::class);
    }
}
