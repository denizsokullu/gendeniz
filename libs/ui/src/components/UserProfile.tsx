import { type HTMLAttributes } from 'react';
import { Avatar } from './Avatar';

export interface UserProfileProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  email?: string;
  avatarSrc?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
  role?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeConfig = {
  sm: {
    avatar: 'sm' as const,
    nameClass: 'text-sm',
    emailClass: 'text-xs',
  },
  md: {
    avatar: 'md' as const,
    nameClass: 'text-base',
    emailClass: 'text-sm',
  },
  lg: {
    avatar: 'lg' as const,
    nameClass: 'text-lg',
    emailClass: 'text-base',
  },
};

export function UserProfile({
  name,
  email,
  avatarSrc,
  status,
  role,
  size = 'md',
  className = '',
  ...props
}: UserProfileProps) {
  const config = sizeConfig[size];

  return (
    <div className={`flex items-center gap-3 ${className}`} {...props}>
      <Avatar src={avatarSrc} name={name} size={config.avatar} status={status} />
      <div className="min-w-0 flex-1">
        <p className={`truncate font-medium text-text-primary ${config.nameClass}`}>{name}</p>
        {email && <p className={`truncate text-text-muted ${config.emailClass}`}>{email}</p>}
        {role && !email && (
          <p className={`truncate text-text-muted ${config.emailClass}`}>{role}</p>
        )}
      </div>
    </div>
  );
}
