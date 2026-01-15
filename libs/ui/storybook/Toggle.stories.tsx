import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from '../src/components/Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

const ControlledToggle = ({
  label,
  description,
  disabled,
  defaultChecked = false,
}: {
  label?: string;
  description?: string;
  disabled?: boolean;
  defaultChecked?: boolean;
}) => {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <Toggle
      label={label}
      description={description}
      disabled={disabled}
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};

export const Default: Story = {
  render: () => <ControlledToggle />,
};

export const WithLabel: Story = {
  render: () => <ControlledToggle label="Enable notifications" />,
};

export const WithDescription: Story = {
  render: () => (
    <ControlledToggle label="Dark mode" description="Use dark theme across the application" />
  ),
};

export const Checked: Story = {
  render: () => <ControlledToggle label="Enabled" defaultChecked />,
};

export const Disabled: Story = {
  render: () => <ControlledToggle label="Disabled toggle" disabled />,
};

export const DisabledChecked: Story = {
  render: () => <ControlledToggle label="Disabled (on)" disabled defaultChecked />,
};

export const SettingsExample: Story = {
  render: () => (
    <div className="space-y-4">
      <ControlledToggle
        label="Email notifications"
        description="Receive email updates about your account"
        defaultChecked
      />
      <ControlledToggle
        label="Push notifications"
        description="Receive push notifications on your device"
      />
      <ControlledToggle
        label="Marketing emails"
        description="Receive updates about new features and promotions"
      />
    </div>
  ),
};
