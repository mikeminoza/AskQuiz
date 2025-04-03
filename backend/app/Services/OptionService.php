<?php

namespace App\Services;

use App\Models\Option;
use Illuminate\Support\Facades\Auth;

class OptionService
{
    public function createOption($question, array $data)
    {
        $optionsData = collect($data['options'])->map(function ($option) use ($data, $question) {
            return [
                'item' => $option,
                'is_correct' => $option === $data['correct_answer'],
                'question_id' => $question->id,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        })->toArray();
        $options = Option::insert($optionsData);
        return ['options' => $options, 'message' => 'Options added successfully!'];
    }

    public function updateOption($question, array $data)
    {
        $existingOptions = $question->options;
        $options = $data['options'];
        $updatedOptions = [];
        foreach ($options as $index => $option) {
            $existingOption = $existingOptions[$index] ?? null;
            if ($existingOption) {
                $existingOption->update([
                    'item' => $option,
                    'is_correct' => $option === $data['correct_answer'],
                    'updated_at' => now(),
                ]);
                $updatedOptions[] = $existingOption->fresh();
            } else {
                $newOption = Option::create([
                    'item' => $option,
                    'is_correct' => $option === $data['correct_answer'],
                    'question_id' => $question->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
                $updatedOptions[] = $newOption;
            }
        }
        return ['options' => $updatedOptions, 'message' => 'Options updated successfully!'];
    }
    public function deleteOption($option)
    {
        if (!$option || $option->question->quiz->user_id !== Auth::id()) {
            return null;
        }
        $option->delete();
        return ['message' => 'Option updated successfully!'];
    }

    public function checkQuestionOption($question)
    {
        if ($question->options()->count() >= 4) {
            return true;
        }
        return false;
    }
}
