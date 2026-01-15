import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardBody, CardFooter } from '../src/components/Card';
import { Button } from '../src/components/Button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card>
      <CardBody>
        <p className="text-text-secondary">This is a basic card with just a body.</p>
      </CardBody>
    </Card>
  ),
};

export const WithHeader: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-text-primary">Card Title</h3>
      </CardHeader>
      <CardBody>
        <p className="text-text-secondary">Card content goes here.</p>
      </CardBody>
    </Card>
  ),
};

export const WithHeaderAndFooter: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-text-primary">Card Title</h3>
      </CardHeader>
      <CardBody>
        <p className="text-text-secondary">
          This card has a header, body, and footer section. Use it to display content with actions.
        </p>
      </CardBody>
      <CardFooter>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            Cancel
          </Button>
          <Button size="sm">Save</Button>
        </div>
      </CardFooter>
    </Card>
  ),
};

export const CompleteExample: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary">Project Settings</h3>
          <span className="text-sm text-text-muted">v1.0.0</span>
        </div>
      </CardHeader>
      <CardBody>
        <p className="text-text-secondary">
          Configure your project settings here. Changes will be applied immediately after saving.
        </p>
        <div className="mt-4 rounded-lg bg-surface-elevated p-3">
          <p className="text-sm text-text-muted">Last updated: 2 hours ago</p>
        </div>
      </CardBody>
      <CardFooter>
        <div className="flex w-full justify-end gap-2">
          <Button variant="outline" size="sm">
            Reset
          </Button>
          <Button size="sm">Save Changes</Button>
        </div>
      </CardFooter>
    </Card>
  ),
};
