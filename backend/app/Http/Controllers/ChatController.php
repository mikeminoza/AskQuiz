<?php

namespace App\Http\Controllers;

use App\Http\Requests\ConversationRequest;
use App\Http\Requests\MessageRequest;
use App\Models\Conversation;
use App\Services\ChatService;
use Auth;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    // access chat service
    public function __construct(protected ChatService $chatService)
    {
    }

    public function index()
    {
        $conversations = $this->chatService->getConversationHistory();
        return response()->json($conversations, 200);
    }
    public function store(ConversationRequest $request)
    {
        $conversation = $this->chatService->createConversation($request->validated());
        return response()->json($conversation, 201);
    }
    public function show(Conversation $conversation)
    {
        $getConversation = $this->chatService->jsonFormatSingleConversation($conversation);
        return response()->json($getConversation, 200);
    }
    public function destroy(Conversation $conversation)
    {
        $data = $this->chatService->deleteConversation($conversation);
        if (!$data) {
            return response()->json(['message' => 'Unable to process request'], 401);
        }
        return response()->json($data, 201);
    }

    public function storeMessage(Conversation $conversation, MessageRequest $request)
    {
        $newConversation = $this->chatService->createMessage($conversation->id, $request->validated());
        return response()->json($newConversation, 201);
    }
}
