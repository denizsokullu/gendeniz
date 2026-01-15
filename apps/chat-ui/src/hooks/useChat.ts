import { useState, useCallback } from 'react';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const mockResponses = [
  "That's a great question! Let me think about that for a moment.",
  "I understand what you're asking. Here's what I think...",
  'Thanks for sharing that! From my perspective, this is interesting because...',
  "I'd be happy to help with that. Based on what you've told me...",
  "That's an interesting point. Have you considered looking at it this way?",
  'I appreciate you bringing this up. Let me provide some insights...',
  "Great observation! Here's something you might find useful...",
  'I see what you mean. Let me elaborate on that topic...',
];

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! How can I help you today?',
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate typing delay (1-3 seconds)
    const delay = Math.random() * 2000 + 1000;
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Add mock response
    const responseIndex = Math.floor(Math.random() * mockResponses.length);
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: mockResponses[responseIndex] as string,
      sender: 'assistant',
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, assistantMessage]);
  }, []);

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: '1',
        content: 'Hello! How can I help you today?',
        sender: 'assistant',
        timestamp: new Date(),
      },
    ]);
  }, []);

  return {
    messages,
    isTyping,
    sendMessage,
    clearChat,
  };
}
