# @gendeniz/ui

A shared React component library for the gendeniz monorepo built with TypeScript and Tailwind CSS.

## Components

| Component     | Description                                                                          |
| ------------- | ------------------------------------------------------------------------------------ |
| `Button`      | Primary actions with variants (primary, secondary, outline, ghost, danger) and sizes |
| `Input`       | Text input with label and error state support                                        |
| `Card`        | Container with CardHeader, CardBody, and CardFooter subcomponents                    |
| `Modal`       | Dialog overlay for focused interactions                                              |
| `Badge`       | Status indicators and labels                                                         |
| `Table`       | Data display with TableHeader, TableBody, TableRow, and TableCell                    |
| `Select`      | Dropdown selection input                                                             |
| `Slider`      | Range input for numeric values                                                       |
| `Toggle`      | Boolean switch control                                                               |
| `Checkbox`    | Multi-select option control                                                          |
| `Avatar`      | User image display with fallback                                                     |
| `UserProfile` | Combined avatar and user info display                                                |

## Installation

This package is available to other apps in the monorepo via workspace dependency:

```json
{
  "dependencies": {
    "@gendeniz/ui": "workspace:*"
  }
}
```

## Usage

```tsx
import { Button, Card, Input } from '@gendeniz/ui';
import '@gendeniz/ui/styles.css';
```

### Tailwind Configuration

Consuming apps should extend the shared Tailwind preset:

```js
// tailwind.config.js
import uiPreset from '@gendeniz/ui/tailwind.preset';

export default {
  presets: [uiPreset],
  content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/@gendeniz/ui/dist/**/*.js'],
};
```

## Development

```bash
# Build the library
pnpm build

# Watch mode during development
pnpm dev

# Run tests
pnpm test

# Type checking
pnpm typecheck
```

---

## Storybook

Storybook provides an interactive component explorer for this library. It lives inside `libs/ui` as an internal development tool.

### Setup

Before running Storybook for the first time, install dependencies:

```bash
pnpm install
```

### Running Storybook

From the monorepo root:

```bash
pnpm --filter @gendeniz/ui storybook
```

Or from within `libs/ui`:

```bash
pnpm storybook
```

Storybook will be available at **http://localhost:6006**

### Configuration

Storybook configuration lives in `libs/ui/.storybook/`:

| File         | Purpose                                           |
| ------------ | ------------------------------------------------- |
| `main.ts`    | Storybook config (addons, framework, story paths) |
| `preview.ts` | Global decorators, parameters, and theme settings |

### Available Stories

Stories for all components are located in `libs/ui/storybook/`:

| Story File                | Component                                     |
| ------------------------- | --------------------------------------------- |
| `Button.stories.tsx`      | Button variants, sizes, loading states, icons |
| `Input.stories.tsx`       | Text inputs with labels, errors, icons        |
| `Card.stories.tsx`        | Card with header, body, footer combinations   |
| `Badge.stories.tsx`       | Badge variants and sizes                      |
| `Modal.stories.tsx`       | Modal sizes and form examples                 |
| `Select.stories.tsx`      | Dropdown with options, disabled states        |
| `Toggle.stories.tsx`      | Toggle switches with labels                   |
| `Slider.stories.tsx`      | Range sliders with formatters                 |
| `Checkbox.stories.tsx`    | Checkboxes with descriptions                  |
| `Avatar.stories.tsx`      | Avatar sizes and status indicators            |
| `Table.stories.tsx`       | Tables with sorting and selection             |
| `UserProfile.stories.tsx` | User profile cards with status                |

### What You Can Do in Storybook

#### Browse Components

Navigate the sidebar to explore all available components organized by category.

#### Interactive Controls

Each component story includes a **Controls** panel where you can:

- Toggle boolean props (e.g., `disabled`, `loading`)
- Select from enum values (e.g., `variant`, `size`)
- Edit string props (e.g., `label`, `placeholder`)
- See changes reflected live in the canvas

#### View Documentation

The **Docs** tab for each component shows:

- Component description and usage examples
- Full props table with types and defaults
- Code snippets for common configurations

#### Test Accessibility

The **Accessibility** panel runs automated a11y checks against each component state, flagging issues like missing labels or poor color contrast.

### Story Structure

Stories are located in `libs/ui/storybook/` and follow this pattern:

```
storybook/
├── Button.stories.tsx
├── Input.stories.tsx
├── Card.stories.tsx
└── ...
```

Each story file exports:

- A default meta object describing the component
- Named exports for each component state/variant

### Adding a New Story

When you add a new component to this library, create a corresponding story:

```tsx
// libs/ui/storybook/MyComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from '../src/components/MyComponent';

const meta: Meta<typeof MyComponent> = {
  title: 'Components/MyComponent',
  component: MyComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Default: Story = {
  args: {
    // default props
  },
};

export const AnotherVariant: Story = {
  args: {
    // variant props
  },
};
```

### Useful Addons

| Addon             | Purpose                                       |
| ----------------- | --------------------------------------------- |
| **Controls**      | Edit props interactively                      |
| **Actions**       | Log callback events (onClick, onChange, etc.) |
| **Viewport**      | Test responsive layouts                       |
| **Backgrounds**   | Toggle light/dark backgrounds                 |
| **Accessibility** | Automated a11y audits                         |
| **Docs**          | Auto-generated documentation                  |
