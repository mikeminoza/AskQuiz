<?php

use App\Http\Controllers\AttemptAnswerController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\OptionController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\QuizAttemptController;
use App\Http\Controllers\QuizController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::middleware(['auth:sanctum'])->group(function () {
    // chatbot
    Route::apiResource('conversations', ChatController::class);
    Route::post('conversations/{conversation}/messages', [ChatController::class, 'storeMessage']);
    // quiz
    Route::apiResource('quizzes', QuizController::class);
    // question
    Route::controller(QuestionController::class)->group(function () {
        Route::prefix('/quizzes/{quiz}/questions')->group(function () {
            Route::post('/', 'store');
            Route::put('/{question}', 'update');
        });
        Route::prefix('questions')->group(function () {
            Route::get('/{question}', 'show');
            Route::delete('/{question}', 'destroy');
        });
    });
    // option
    Route::controller(OptionController::class)->group(function () {
        Route::prefix('/questions/{question}/options')->group(function () {
            Route::post('/', 'store');
            Route::put('/', 'update');
        });
        Route::delete('/options/{option}', 'destroy');
    });
    // quiz attempt
    Route::controller(QuizAttemptController::class)->group(function () {
        Route::post('/quizzes/{quiz}/attempt-quiz', 'store');
        Route::delete('/attempt-quiz/{quizAttempt}', 'destroy');
    });
    // quiz attempt answers
    Route::post('/attempt-quiz/{quizAttempt}/question/{question}', [AttemptAnswerController::class, 'store']);
});