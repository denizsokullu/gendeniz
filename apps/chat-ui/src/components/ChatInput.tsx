import { useState, useCallback, type KeyboardEvent } from 'react';
import { Button } from '@gendeniz/ui';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = useCallback(() => {
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
    }
  }, [input, onSend, disabled]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-2">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        disabled={disabled}
        rows={1}
        className="flex-1 resize-none rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-surface-elevated disabled:text-text-muted"
        style={{ minHeight: '44px', maxHeight: '120px' }}
      />
      <Button onClick={handleSend} disabled={disabled || !input.trim()} className="h-11">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
      </Button>
    </div>
  );
}
