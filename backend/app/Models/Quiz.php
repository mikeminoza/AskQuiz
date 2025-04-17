<?php

namespace App\Models;

use App\ReadableTimestamps;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use ReadableTimestamps;
    protected $fillable = [
        'title',
        'description',
        'category',
        'is_public',
        'status',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    public function quizAttempt()
    {
        return $this->hasMany(QuizAttempt::class);
    }
}
