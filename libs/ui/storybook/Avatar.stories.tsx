import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '../src/components/Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    status: {
      control: 'select',
      options: [undefined, 'online', 'offline', 'away', 'busy'],
    },
    name: { control: 'text' },
    src: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    name: 'John Doe',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    name: 'John Doe',
  },
};

export const ExtraSmall: Story = {
  args: {
    name: 'Jane Smith',
    size: 'xs',
  },
};

export const Small: Story = {
  args: {
    name: 'Jane Smith',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    name: 'Jane Smith',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    name: 'Jane Smith',
    size: 'lg',
  },
};

export const ExtraLarge: Story = {
  args: {
    name: 'Jane Smith',
    size: 'xl',
  },
};

export const Online: Story = {
  args: {
    name: 'John Doe',
    status: 'online',
  },
};

export const Offline: Story = {
  args: {
    name: 'John Doe',
    status: 'offline',
  },
};

export const Away: Story = {
  args: {
    name: 'John Doe',
    status: 'away',
  },
};

export const Busy: Story = {
  args: {
    name: 'John Doe',
    status: 'busy',
  },
};

export const NoName: Story = {
  args: {},
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar name="User" size="xs" />
      <Avatar name="User" size="sm" />
      <Avatar name="User" size="md" />
      <Avatar name="User" size="lg" />
      <Avatar name="User" size="xl" />
    </div>
  ),
};

export const AllStatuses: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar name="Online" status="online" />
      <Avatar name="Offline" status="offline" />
      <Avatar name="Away" status="away" />
      <Avatar name="Busy" status="busy" />
    </div>
  ),
};
