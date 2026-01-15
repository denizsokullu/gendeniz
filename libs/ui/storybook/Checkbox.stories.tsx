import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../src/components/Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

const ControlledCheckbox = ({
  label,
  description,
  error,
  disabled,
  defaultChecked = false,
}: {
  label?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  defaultChecked?: boolean;
}) => {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <Checkbox
      label={label}
      description={description}
      error={error}
      disabled={disabled}
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};

export const Default: Story = {
  render: () => <ControlledCheckbox label="Accept terms" />,
};

export const WithDescription: Story = {
  render: () => (
    <ControlledCheckbox
      label="Subscribe to newsletter"
      description="Receive weekly updates and promotions"
    />
  ),
};

export const Checked: Story = {
  render: () => <ControlledCheckbox label="Already checked" defaultChecked />,
};

export const WithError: Story = {
  render: () => (
    <ControlledCheckbox
      label="I agree to the terms and conditions"
      error="You must accept the terms to continue"
    />
  ),
};

export const Disabled: Story = {
  render: () => <ControlledCheckbox label="Disabled checkbox" disabled />,
};

export const DisabledChecked: Story = {
  render: () => <ControlledCheckbox label="Disabled (checked)" disabled defaultChecked />,
};

export const CheckboxGroup: Story = {
  render: () => (
    <div className="space-y-3">
      <p className="text-sm font-medium text-text-primary">Select your interests:</p>
      <ControlledCheckbox label="Technology" defaultChecked />
      <ControlledCheckbox label="Design" />
      <ControlledCheckbox label="Business" defaultChecked />
      <ControlledCheckbox label="Marketing" />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div className="space-y-4">
      <ControlledCheckbox label="Remember me" description="Keep me signed in on this device" />
      <ControlledCheckbox
        label="I agree to the Terms of Service"
        description="By checking this box, you agree to our Terms of Service and Privacy Policy"
      />
    </div>
  ),
};
