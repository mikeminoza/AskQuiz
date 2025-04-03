<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    protected $fillable = [
        'item',
        'is_correct',
        'question_id',
    ];

    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    public function attemptAnswers()
    {
        return $this->hasMany(AttemptAnswer::class);
    }
}
