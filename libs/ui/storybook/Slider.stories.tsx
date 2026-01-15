import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from '../src/components/Slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    showValue: { control: 'boolean' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

const ControlledSlider = ({
  label,
  showValue = true,
  min = 0,
  max = 100,
  step = 1,
  disabled,
  defaultValue = 50,
  valueFormatter,
}: {
  label?: string;
  showValue?: boolean;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  defaultValue?: number;
  valueFormatter?: (value: number) => string;
}) => {
  const [value, setValue] = useState(defaultValue);
  return (
    <Slider
      label={label}
      showValue={showValue}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      value={value}
      valueFormatter={valueFormatter}
      onChange={(e) => setValue(Number(e.target.value))}
    />
  );
};

export const Default: Story = {
  render: () => <ControlledSlider />,
};

export const WithLabel: Story = {
  render: () => <ControlledSlider label="Volume" defaultValue={75} />,
};

export const WithoutValue: Story = {
  render: () => <ControlledSlider label="Brightness" showValue={false} />,
};

export const CustomRange: Story = {
  render: () => <ControlledSlider label="Temperature" min={60} max={90} defaultValue={72} />,
};

export const WithStep: Story = {
  render: () => <ControlledSlider label="Quantity" min={0} max={100} step={10} defaultValue={50} />,
};

export const WithFormatter: Story = {
  render: () => (
    <ControlledSlider
      label="Price"
      min={0}
      max={1000}
      step={50}
      defaultValue={500}
      valueFormatter={(value) => `$${value}`}
    />
  ),
};

export const PercentageFormatter: Story = {
  render: () => (
    <ControlledSlider
      label="Opacity"
      min={0}
      max={100}
      defaultValue={80}
      valueFormatter={(value) => `${value}%`}
    />
  ),
};

export const Disabled: Story = {
  render: () => <ControlledSlider label="Disabled slider" disabled />,
};
