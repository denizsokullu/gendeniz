import { Avatar } from '@gendeniz/ui';

export function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <Avatar name="AI" size="sm" status="online" />
      <div className="rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm">
        <div className="flex gap-1">
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
            style={{ animationDelay: '0ms' }}
          />
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
            style={{ animationDelay: '150ms' }}
          />
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
            style={{ animationDelay: '300ms' }}
          />
        </div>
      </div>
    </div>
  );
}
