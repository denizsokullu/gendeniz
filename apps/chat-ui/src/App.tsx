import { useRef, useEffect } from 'react';
import { Button, UserProfile } from '@gendeniz/ui';
import { useChat } from './hooks/useChat';
import { MessageBubble } from './components/MessageBubble';
import { ChatInput } from './components/ChatInput';
import { TypingIndicator } from './components/TypingIndicator';

export default function App() {
  const { messages, isTyping, sendMessage, clearChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-surface px-4 py-3">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <UserProfile name="AI Assistant" role="Online" status="online" size="sm" />
          <Button variant="ghost" size="sm" onClick={clearChat}>
            Clear Chat
          </Button>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-background">
        <div className="mx-auto max-w-3xl space-y-4 px-4 py-6">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-surface px-4 py-4">
        <div className="mx-auto max-w-3xl">
          <ChatInput onSend={sendMessage} disabled={isTyping} />
        </div>
      </div>
    </div>
  );
}
