# TypeScript Monorepo Interview Project Plan

## Project Overview

Create a TypeScript monorepo demonstrating:

- Monorepo build system (Turborepo + pnpm workspaces)
- Shared UI component library
- Two applications consuming the library
- Unit testing setup
- CI/CD deployment pipeline (Docker + GitHub Actions)

## Recommended Tech Stack

| Area                | Choice                                   | Rationale                                     |
| ------------------- | ---------------------------------------- | --------------------------------------------- |
| Package Manager     | pnpm                                     | Fast, disk-efficient, great workspace support |
| Build Orchestration | Turborepo                                | Simple yet powerful, caching, parallel builds |
| UI Framework        | React + TypeScript                       | Industry standard                             |
| Bundler             | Vite                                     | Fast HMR, great DX, ESM-native                |
| Testing             | Vitest                                   | Fast, Vite-native, Jest-compatible API        |
| Styling             | Tailwind CSS                             | Rapid prototyping, consistent design          |
| Deployment          | Docker + Docker Compose + GitHub Actions | Portable, enterprise patterns                 |

## Directory Structure

```
genweb/
├── .github/workflows/       # CI/CD pipelines
│   ├── frontend.yml        # Lint, test, build, Docker verification
│   └── deploy.yml          # Build & push Docker images
├── apps/
│   ├── data-explorer/      # Tabular data exploration app
│   ├── chat-ui/            # Chat interface app
│   └── 3d-visualization/   # Three.js 3D graphics app
├── libs/
│   └── ui/                 # Shared UI component library
├── infra/docker/            # Dockerfiles per app
├── docs/
│   ├── PLANNING.md         # This planning document (for interviewers)
│   └── ARCHITECTURE.md     # Technical architecture decisions
├── tools/scripts/           # Build utilities
├── package.json            # Root workspace config
├── pnpm-workspace.yaml     # Workspace definition
├── turbo.json              # Turborepo config
├── tsconfig.base.json      # Shared TS config
├── docker-compose.yml      # Run all apps locally
└── README.md               # Project overview
```

> **Note**: This planning document will be included in `docs/PLANNING.md` to show the thinking process to interviewers.

---

## Task Breakdown

### Phase 1: Foundation Setup

**Task 1.1: Initialize Monorepo Structure** (Promptable)

- Initialize git repo
- Create pnpm workspace with `pnpm-workspace.yaml`
- Set up root `package.json` with workspace scripts
- Configure Turborepo (`turbo.json`)
- Create shared TypeScript config (`tsconfig.base.json`)
- Add `.gitignore`, `.nvmrc`

**Task 1.2: Configure Tooling** (Promptable)

- Set up ESLint with TypeScript rules
- Configure Prettier
- Add lint-staged + husky for pre-commit hooks

---

### Phase 2: UI Component Library

**Task 2.1: Scaffold UI Library** (Promptable)

- Create `libs/ui/` package structure
- Configure Vite in library mode
- Set up Tailwind CSS
- Export TypeScript types properly

**Task 2.2: Implement Core Components** (Promptable)

- `Button` - variants (primary, secondary, outline), sizes, loading state
- `Input` - text input with label, error state
- `Card` - container with header, body, footer slots
- `Modal` - dialog with backdrop, animations
- `Badge` - status indicators
- `Table` - basic table with sorting headers

**Task 2.3: Add Component Tests** (Promptable)

- Configure Vitest + React Testing Library
- Write unit tests for each component
- Add test coverage reporting

---

### Phase 3: Data Explorer App

**Task 3.1: Scaffold Data Explorer App** (Promptable)

- Create `apps/data-explorer/` with Vite + React
- Link to `@genweb/ui` library
- Set up routing (React Router)

**Task 3.2: Implement Features** (Promptable)

- CSV/JSON file upload and parsing
- Data table with sorting, filtering, pagination
- Column visibility toggles
- Basic data statistics panel

**Task 3.3: Add App Tests** (Promptable)

- Unit tests for data processing utilities
- Component tests for key UI interactions

---

### Phase 4: Chat UI App

**Task 4.1: Scaffold Chat App** (Promptable)

- Create `apps/chat-ui/` with Vite + React
- Link to `@genweb/ui` library

**Task 4.2: Implement Features** (Promptable)

- Message list with auto-scroll
- Message input with send button
- Message bubbles (sent/received styling)
- Typing indicator
- Mock message responses (simulated delay, no backend)

**Task 4.3: Add App Tests** (Promptable)

- Component tests for message rendering
- Test message send flow

---

### Phase 5: 3D Visualization App

**Task 5.1: Scaffold 3D Visualization App** (Promptable)

- Create `apps/3d-visualization/` with Vite + React
- Add Three.js dependencies (@react-three/fiber, @react-three/drei, three)
- Configure TypeScript for Three.js types

**Task 5.2: Implement Fat Lines Demo** (Promptable)

- Implement Hilbert 3D curve generator
- Create Line2 with LineMaterial for fat lines rendering
- Add OrbitControls for camera manipulation
- Implement lil-gui controls for line parameters:
  - Line type (Line2 vs gl.LINE)
  - Line width
  - Dashed lines with scale/gap controls
  - World units toggle
  - Alpha to coverage

**Task 5.3: Add Dockerfile** (Promptable)

- Create Dockerfile for 3d-visualization app
- Update docker-compose.yml with new service
- Update CI workflow for Docker builds

---

### Phase 6: Docker & Deployment

**Task 6.1: Create Dockerfiles** (Promptable)

- Multi-stage Dockerfile for each app (build + nginx)
- Optimize for small image size
- Handle pnpm workspace properly in Docker context

**Task 6.2: Docker Compose Setup** (Promptable)

- Create `docker-compose.yml` for local development
- Run all apps on different ports
- Add nginx reverse proxy (optional) for unified entry point

**Task 6.3: GitHub Actions CI** (Promptable)

- Create `.github/workflows/ci.yml`
- Run lint, type-check, tests on all PRs
- Cache pnpm dependencies

**Task 6.4: GitHub Actions Deploy** (Promptable)

- Create `.github/workflows/deploy.yml`
- Build Docker images on merge to main
- Push to container registry (GitHub Container Registry or Docker Hub)

---

## Suggested Task Order for Prompting

| #   | Task    | Prompt Summary                                                  |
| --- | ------- | --------------------------------------------------------------- |
| 1   | 1.1     | "Initialize a pnpm + Turborepo monorepo with TypeScript"        |
| 2   | 1.2     | "Add ESLint, Prettier, husky pre-commit hooks"                  |
| 3   | 2.1     | "Create the @genweb/ui library with Vite + Tailwind"            |
| 4   | 2.2     | "Implement Button, Input, Card, Modal, Badge, Table components" |
| 5   | 2.3     | "Add Vitest tests for UI components"                            |
| 6   | 3.1-3.3 | "Create data-explorer app with file upload and data table"      |
| 7   | 4.1-4.3 | "Create chat-ui app with message list and mock responses"       |
| 8   | 5.1-5.2 | "Add Dockerfiles and docker-compose.yml for all apps"           |
| 9   | 5.3-5.4 | "Create GitHub Actions CI/CD workflows"                         |
| 10  | Docs    | "Copy planning doc to project and write README"                 |

---

## What to Do Manually vs. Prompt

### Better Done Manually

- Initial GitHub repo creation
- Setting up container registry credentials as GitHub secrets
- Final README polish and personal touches
- Any design tweaks to make it "yours"

### Better to Prompt

- All boilerplate/scaffolding
- Component implementations
- Test file generation
- Docker and CI/CD configurations

---

## Key Demonstration Points

This project demonstrates:

1. **Build System**: Turborepo orchestrates builds across packages
2. **Code Sharing**: UI library consumed by both apps
3. **Testing**: Vitest with coverage across packages
4. **Type Safety**: Strict TypeScript throughout
5. **Docker**: Multi-stage builds, docker-compose orchestration
6. **CI/CD**: Automated testing and container deployment

---

## Verification Plan

1. `pnpm install` - all dependencies resolve
2. `pnpm build` - all packages build
3. `pnpm test` - all tests pass
4. `pnpm lint` - no linting errors
5. `pnpm dev --filter=data-explorer` - app runs locally
6. `pnpm dev --filter=chat-ui` - app runs locally
7. `pnpm dev --filter=3d-visualization` - app runs locally
8. `docker-compose up` - all apps run in containers
9. Push to GitHub - CI passes
10. Merge to main - Docker images built and pushed

---

## Completed Tasks

A rolling summary of all features and changes implemented in this project.

### Theme Implementation - Obsidian + Neon Lime (2025-01-15)

Implemented a bold, cutting-edge dark theme across the entire project.

**Color Palette:**
| Token | Hex | Usage |
|-------|-----|-------|
| Primary | `#84CC16` | Buttons, links, accents |
| Primary Hover | `#A3E635` | Hover states |
| Background | `#0A0A0B` | Page background |
| Surface | `#141415` | Cards, panels |
| Surface Elevated | `#1C1C1E` | Modals, dropdowns |
| Border | `#27272A` | Dividers, outlines |
| Text Primary | `#FAFAFA` | Headings, body |
| Text Secondary | `#A1A1AA` | Descriptions, labels |
| Text Muted | `#71717A` | Placeholders, hints |

**Files Created/Updated:**

- `libs/ui/tailwind.config.js` - Full color palette with gradients and shadows
- `libs/ui/src/theme/index.ts` - Exportable TypeScript theme tokens
- `libs/ui/src/styles.css` - CSS custom properties
- `libs/ui/tailwind.preset.js` - Shareable Tailwind preset for apps
- `libs/ui/package.json` - Added `./tailwind.preset` export
- All 11 UI components updated with dark theme colors
- Both apps updated to use the theme preset and dark backgrounds

---

### CI/CD Workflow Improvements (2025-01-15)

**Renamed workflow** from `ci.yml` to `frontend.yml` for better clarity in monorepo setup.

**Added Docker build verification:**

- New `docker-build` job that depends on the `test` job
- Builds both `chat-ui` and `data-explorer` Docker images
- Ensures Docker builds don't break on every push/PR

**Workflow structure:**

```
jobs:
  test:           # Lint, typecheck, test, build
  docker-build:   # Build Docker images (depends on test)
```

---

### 3D Visualization App (2025-01-15)

Added a new Three.js-powered 3D visualization app showcasing advanced line rendering.

**Features:**

- Hilbert 3D curve generation with Catmull-Rom spline interpolation
- Fat lines rendering using Three.js Line2 and LineMaterial
- Interactive controls via lil-gui:
  - Line type toggle (Line2 vs gl.LINE)
  - Line width adjustment (1-10)
  - Dashed line support with scale/gap controls
  - World units toggle
  - Alpha to coverage option
- OrbitControls for camera manipulation
- Rainbow color gradient along the curve

**Tech Stack:**

- React 18 + TypeScript
- @react-three/fiber (React Three.js renderer)
- @react-three/drei (OrbitControls)
- Three.js addons (Line2, LineMaterial, LineGeometry)
- lil-gui for controls
- Vite for bundling

**Files Created:**

- `apps/3d-visualization/` - Complete React app structure
- `apps/3d-visualization/src/components/FatLinesScene.tsx` - Three.js scene component
- `apps/3d-visualization/src/utils/hilbert.ts` - Hilbert curve generator
- `infra/docker/Dockerfile.3d-visualization` - Docker configuration

**Updated:**

- `docker-compose.yml` - Added 3d-visualization service (port 3003)
- `.github/workflows/frontend.yml` - Added Docker build for new app
