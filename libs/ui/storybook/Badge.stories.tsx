import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../src/components/Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Default',
    variant: 'default',
  },
};

export const Primary: Story = {
  args: {
    children: 'Primary',
    variant: 'primary',
  },
};

export const Success: Story = {
  args: {
    children: 'Success',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    children: 'Warning',
    variant: 'warning',
  },
};

export const Danger: Story = {
  args: {
    children: 'Danger',
    variant: 'danger',
  },
};

export const Info: Story = {
  args: {
    children: 'Info',
    variant: 'info',
  },
};

export const Small: Story = {
  args: {
    children: 'Small',
    size: 'sm',
    variant: 'primary',
  },
};

export const Large: Story = {
  args: {
    children: 'Large',
    size: 'lg',
    variant: 'primary',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm" variant="primary">
        Small
      </Badge>
      <Badge size="md" variant="primary">
        Medium
      </Badge>
      <Badge size="lg" variant="primary">
        Large
      </Badge>
    </div>
  ),
};
