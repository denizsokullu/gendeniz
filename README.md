# Gendeniz

A TypeScript monorepo demonstrating modern web development practices including build systems, unit testing, CI/CD, and component library architecture.

## Project Structure

```
gendeniz/
├── apps/
│   ├── data-explorer/     # Data exploration app with AI-assisted queries
│   ├── chat-ui/           # Chat interface app with mock responses
│   └── 3d-visualization/  # Three.js 3D graphics demo
├── libs/
│   └── ui/                # Shared React component library
├── infra/docker/          # Docker configurations
├── .github/workflows/     # CI/CD pipelines
└── docs/                  # Documentation
```

## Tech Stack

| Area                | Technology              |
| ------------------- | ----------------------- |
| Package Manager     | pnpm (workspaces)       |
| Build Orchestration | Turborepo               |
| UI Framework        | React + TypeScript      |
| Bundler             | Vite                    |
| Testing             | Vitest                  |
| Styling             | Tailwind CSS            |
| Deployment          | Docker + GitHub Actions |

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm (`npm install -g pnpm`)
- Docker (optional, for containerized deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/gendeniz.git
cd gendeniz

# Install dependencies
pnpm install
```

### Development

```bash
# Run all apps in development mode
pnpm dev

# Run a specific app
pnpm --filter @gendeniz/data-explorer dev
pnpm --filter @gendeniz/chat-ui dev
pnpm --filter @gendeniz/3d-visualization dev
```

### Building

```bash
# Build all packages
pnpm build

# Build a specific package
pnpm --filter @gendeniz/ui build
```

### Testing

```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run tests in watch mode
pnpm --filter @gendeniz/ui test:watch
```

### Linting

```bash
# Lint all packages
pnpm lint

# Fix linting issues
pnpm lint:fix
```

## Docker

### Build and run with Docker Compose

```bash
# Build and run all apps
docker-compose up --build

# Run in detached mode
docker-compose up -d --build
```

Apps will be available at:

- Data Explorer: http://localhost:3001
- Chat UI: http://localhost:3002
- 3D Visualization: http://localhost:3003

## Apps

### Data Explorer

An interactive data exploration tool that allows users to:

- Upload CSV/JSON files or load sample stock market data
- View data in a sortable, paginated table
- Filter columns and search across all data
- Ask natural language questions about the data (mock LLM integration)

### Chat UI

A chat interface demonstrating:

- Real-time message rendering
- Typing indicators
- Auto-scroll to latest messages
- Mock assistant responses

### 3D Visualization

A Three.js-powered 3D graphics demo featuring:

- Hilbert 3D curve with smooth spline interpolation
- Fat lines rendering using Line2 and LineMaterial
- Interactive controls for line width, dashing, and rendering mode
- OrbitControls for camera manipulation
- Rainbow color gradient visualization

Built with @react-three/fiber for React integration.

## UI Library (@gendeniz/ui)

A shared component library featuring:

- Button (with variants, sizes, loading state)
- Input (with labels, error states, icons)
- Card (with header, body, footer)
- Modal (with backdrop, animations)
- Badge (status indicators)
- Table (with sorting)
- Select, Slider, Toggle
- Checkbox
- Avatar, UserProfile

## CI/CD

GitHub Actions workflows handle:

- Linting and type checking on PRs
- Running tests
- Building all packages
- Docker image builds (on merge to main)

## License

MIT
