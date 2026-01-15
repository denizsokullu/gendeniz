import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '../src/components/Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const defaultOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

export const Default: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Select an option',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Country',
    options: [
      { value: 'us', label: 'United States' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'ca', label: 'Canada' },
      { value: 'au', label: 'Australia' },
    ],
    placeholder: 'Select a country',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Timezone',
    options: [
      { value: 'pst', label: 'Pacific Time (PST)' },
      { value: 'mst', label: 'Mountain Time (MST)' },
      { value: 'cst', label: 'Central Time (CST)' },
      { value: 'est', label: 'Eastern Time (EST)' },
    ],
    placeholder: 'Select timezone',
    helperText: 'Used for scheduling and notifications',
  },
};

export const WithError: Story = {
  args: {
    label: 'Category',
    options: defaultOptions,
    placeholder: 'Select a category',
    error: 'Please select a category',
  },
};

export const WithDisabledOption: Story = {
  args: {
    label: 'Plan',
    options: [
      { value: 'free', label: 'Free' },
      { value: 'pro', label: 'Pro' },
      { value: 'enterprise', label: 'Enterprise', disabled: true },
    ],
    placeholder: 'Select a plan',
    helperText: 'Enterprise plan coming soon',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Select',
    options: defaultOptions,
    placeholder: 'Cannot select',
    disabled: true,
  },
};
