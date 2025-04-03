<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class QuestionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $quiz = $this->route('quiz');
        // update
        if ($this->isMethod('put')) {
            $question = $this->route('question');
            return $quiz && $question && $quiz->user_id === Auth::id();
        }
        // create
        return $quiz && $quiz->user_id === Auth::id();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'question_text' => 'required|string',
        ];
    }
}
