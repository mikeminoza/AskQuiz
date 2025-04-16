<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class QuizRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // update
        if ($this->isMethod('put')) {
            $quiz = $this->route('quiz');
            return $quiz && $quiz->user_id === Auth::id();
        }

        // create
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|',
            'description' => 'nullable|string',
            'category' => 'required|string',
            'is_public' => 'required|boolean',
        ];
    }
}
