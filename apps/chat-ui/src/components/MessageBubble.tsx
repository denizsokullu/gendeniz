import { Avatar } from '@gendeniz/ui';
import type { Message } from '../hooks/useChat';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <Avatar name={isUser ? 'You' : 'AI'} size="sm" status={isUser ? undefined : 'online'} />
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
          isUser
            ? 'rounded-br-md bg-primary-500 text-text-inverse'
            : 'rounded-bl-md bg-surface-elevated text-text-primary shadow-sm'
        } `}
      >
        <p className="text-sm">{message.content}</p>
        <p className={`mt-1 text-xs ${isUser ? 'text-primary-200' : 'text-text-muted'}`}>
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
}
