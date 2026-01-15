import type { Meta, StoryObj } from '@storybook/react';
import { UserProfile } from '../src/components/UserProfile';

const meta: Meta<typeof UserProfile> = {
  title: 'Components/UserProfile',
  component: UserProfile,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    status: {
      control: 'select',
      options: [undefined, 'online', 'offline', 'away', 'busy'],
    },
    name: { control: 'text' },
    email: { control: 'text' },
    role: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof UserProfile>;

export const Default: Story = {
  args: {
    name: 'John Doe',
    email: 'john.doe@example.com',
  },
};

export const WithImage: Story = {
  args: {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    avatarSrc: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  },
};

export const WithStatus: Story = {
  args: {
    name: 'Bob Johnson',
    email: 'bob@example.com',
    status: 'online',
  },
};

export const WithRole: Story = {
  args: {
    name: 'Alice Brown',
    role: 'Product Manager',
  },
};

export const Small: Story = {
  args: {
    name: 'John Doe',
    email: 'john@example.com',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    name: 'John Doe',
    email: 'john@example.com',
    size: 'lg',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <UserProfile name="Small Size" email="small@example.com" size="sm" />
      <UserProfile name="Medium Size" email="medium@example.com" size="md" />
      <UserProfile name="Large Size" email="large@example.com" size="lg" />
    </div>
  ),
};

export const AllStatuses: Story = {
  render: () => (
    <div className="space-y-4">
      <UserProfile name="Online User" email="online@example.com" status="online" />
      <UserProfile name="Offline User" email="offline@example.com" status="offline" />
      <UserProfile name="Away User" email="away@example.com" status="away" />
      <UserProfile name="Busy User" email="busy@example.com" status="busy" />
    </div>
  ),
};

export const TeamList: Story = {
  render: () => (
    <div className="space-y-3 rounded-lg border border-border bg-surface p-4">
      <h3 className="mb-4 text-sm font-medium text-text-muted">Team Members</h3>
      <UserProfile
        name="Sarah Connor"
        email="sarah@example.com"
        avatarSrc="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
        status="online"
      />
      <UserProfile name="John Smith" email="john@example.com" status="busy" />
      <UserProfile name="Emily Davis" email="emily@example.com" status="away" />
      <UserProfile name="Michael Lee" email="michael@example.com" status="offline" />
    </div>
  ),
};
