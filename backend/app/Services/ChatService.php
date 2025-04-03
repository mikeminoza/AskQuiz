<?php

namespace App\Services;

use App\Models\Conversation;
use Illuminate\Support\Facades\Auth;

class ChatService
{
    public function getConversationHistory()
    {
        $conversations = Auth::user()->conversations()->with('messages')->latest()->get();
        return $this->jsonFormatMultipleConversation($conversations);
    }
    public function createConversation(array $data)
    {
        $conversation = Conversation::create([
            'title' => $data['title'],
            'user_id' => Auth::id()
        ]);
        $this->createMessage([
            'role' => $data['role'],
            'text' => $data['text']
        ], $conversation->id);
        return $this->jsonFormatSingleConversation($conversation);
    }

    public function createMessage($conversation_id, array $data, )
    {
        $conversation = Conversation::findOrFail($conversation_id);
        $conversation->messages()->create([
            'role' => $data['role'],
            'text' => $data['text']
        ]);
        return $this->jsonFormatSingleConversation($conversation);
    }

    public function deleteConversation($conversation)
    {
        if (!$conversation || $conversation->user_id != Auth::id()) {
            return null;
        }
        $conversation->delete();
        return ['message' => 'Conversation deleted successfully'];
    }

    public function jsonFormatSingleConversation($conversation)
    {
        return [
            'conversation' => [
                'id' => $conversation->id,
                'title' => $conversation->title,
                'messages' => $this->getFormatMessages($conversation)
            ]
        ];
    }

    public function jsonFormatMultipleConversation($conversations)
    {
        return [
            'conversations' => $conversations->map(function ($conversation) {
                return [
                    'id' => $conversation->id,
                    'title' => $conversation->title,
                    'message' => $this->getFormatMessages($conversation)
                ];
            })
        ];
    }

    public function getFormatMessages($conversation)
    {
        return $conversation->messages()->orderBy('created_at')->get()->map(function ($message) {
            return [
                'role' => $message->role,
                'parts' => [
                    ['text' => $message->text]
                ]
            ];
        });
    }
}
