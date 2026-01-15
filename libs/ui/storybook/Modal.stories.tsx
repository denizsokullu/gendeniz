import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from '../src/components/Modal';
import { Button } from '../src/components/Button';
import { Input } from '../src/components/Input';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    closeOnOverlayClick: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalDemo = ({
  size,
  closeOnOverlayClick,
  closeOnEscape,
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Modal Title"
        size={size}
        closeOnOverlayClick={closeOnOverlayClick}
        closeOnEscape={closeOnEscape}
      >
        <p className="text-text-secondary">
          This is the modal content. You can put any content here.
        </p>
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => <ModalDemo />,
};

export const Small: Story = {
  render: () => <ModalDemo size="sm" />,
};

export const Large: Story = {
  render: () => <ModalDemo size="lg" />,
};

export const ExtraLarge: Story = {
  render: () => <ModalDemo size="xl" />,
};

export const NoOverlayClose: Story = {
  render: () => <ModalDemo closeOnOverlayClick={false} />,
};

const FormModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Create Account</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Create Account" size="md">
        <div className="space-y-4">
          <Input label="Full Name" placeholder="John Doe" />
          <Input label="Email" type="email" placeholder="john@example.com" />
          <Input label="Password" type="password" placeholder="Enter password" />
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button>Create</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export const WithForm: Story = {
  render: () => <FormModal />,
};
