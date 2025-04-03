<?php

namespace App\Http\Controllers;

use App\Http\Requests\OptionRequest;
use App\Models\Option;
use App\Models\Question;
use App\Services\OptionService;
use Illuminate\Http\Request;

class OptionController extends Controller
{
    public function __construct(protected OptionService $optionService)
    {
    }
    public function store(Question $question, OptionRequest $request)
    {
        $checkQuestion = $this->optionService->checkQuestionOption($question);
        if ($checkQuestion) {
            return response()->json(['message' => 'Question already has 4 options'], 422);
        }
        $data = $this->optionService->createOption($question, $request->validated());
        return response()->json($data, 201);
    }
    public function update(Question $question, OptionRequest $request)
    {
        $data = $this->optionService->updateOption($question, $request->validated());
        return response()->json($data, 200);
    }
    public function destroy(Option $option)
    {
        $data = $this->optionService->deleteOption($option);
        if (!$data) {
            return response()->json(['message' => 'Unable to process request'], 401);
        }
        return response()->json($data, 200);
    }
}
