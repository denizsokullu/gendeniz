# TypeScript Monorepo Interview Project Plan

## Project Overview

Create a TypeScript monorepo demonstrating:

- Monorepo build system (Turborepo + pnpm workspaces)
- Shared UI component library
- Three applications consuming the library
- Unit testing setup
- CI/CD deployment pipeline (Docker + GitHub Actions)
- WebAssembly integration for real-time video processing

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
| 3D Graphics         | Three.js                                 | Industry standard for WebGL                   |
| WASM                | Rust + wasm-pack                         | Real-world WASM tooling                       |

## Directory Structure

```
genweb/
├── .github/workflows/       # CI/CD pipelines
│   ├── ci.yml              # Lint, test, build on PR
│   └── deploy.yml          # Build & push Docker images
├── apps/
│   ├── data-explorer/      # Tabular data exploration app
│   ├── chat-ui/            # Chat interface app
│   └── video-fx/           # Webcam filter playground (uses WASM)
├── libs/
│   ├── ui/                 # Shared UI component library
│   └── wasm-filters/       # Rust WASM image processing library
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

## WASM Approach: Photon-rs

We'll use **Photon-rs** ([github.com/silvia-odwyer/photon](https://github.com/silvia-odwyer/photon)) as the image processing engine:

- **96 image processing functions** including blur, sharpen, edge detection, color manipulation
- **Pure Rust** with excellent WASM support via wasm-pack
- **4-10x faster than JavaScript** for pixel manipulation
- **Well-documented** with TypeScript bindings

### Video-FX App Architecture

```
┌─────────────┐    ┌──────────────┐    ┌─────────────┐    ┌──────────────┐
│   Webcam    │───▶│ Hidden Canvas │───▶│  WASM/Rust  │───▶│   Display    │
│ getUserMedia│    │  ImageData   │    │  Photon-rs  │    │ Canvas/Three │
└─────────────┘    └──────────────┘    └─────────────┘    └──────────────┘
                                              ▲
                                              │
                                    ┌─────────┴─────────┐
                                    │  Control Panel    │
                                    │  (@genweb/ui)     │
                                    │  - Filter select  │
                                    │  - Intensity      │
                                    │  - Toggle 3D view │
                                    └───────────────────┘
```

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

### Phase 5: WASM Image Processing Library (Photon-rs)

**Task 5.1: Create Rust WASM Library** (Promptable)

- Create `libs/wasm-filters/` with Cargo + wasm-pack
- Use Photon-rs as the core image processing engine
- Wrap Photon-rs functions for our use case:
  - `apply_gaussian_blur(pixels, intensity)`
  - `apply_box_blur(pixels, radius)`
  - `apply_motion_blur(pixels, angle, intensity)`
  - `apply_sharpen(pixels, strength)`
  - `apply_edge_detection(pixels, threshold)`
  - `apply_invert(pixels)`
  - `apply_grayscale(pixels)`
- Build WASM + generate TypeScript bindings

**Task 5.2: Create npm Wrapper Package** (Promptable)

- Create `libs/wasm-filters-js/` TypeScript wrapper
- Handle WASM loading and async initialization
- Export typed functions matching the Rust API
- Include ImageData ↔ pixel buffer conversion utilities

---

### Phase 6: Video FX App (Interactive Filter Playground)

**Task 6.1: Scaffold Video FX App** (Promptable)

- Create `apps/video-fx/` with Vite + React
- Add Three.js and @react-three/fiber
- Link to `@genweb/ui` and `@genweb/wasm-filters`

**Task 6.2: Implement Webcam + WASM Pipeline** (Promptable)

- Webcam capture with `getUserMedia()`
- Canvas frame extraction
- WASM filter processing via Photon-rs
- Real-time display of processed frames

**Task 6.3: Build Filter Control Panel** (Promptable)
Using @genweb/ui components, create an interactive control panel:

**Filter Mode Selector** (dropdown or radio buttons):

- Gaussian Blur
- Box Blur
- Motion Blur
- Sharpen
- Edge Detection (Sobel)
- Invert Colors
- Grayscale

**Per-Filter Configuration Controls**:
| Filter | Controls |
|--------|----------|
| Gaussian Blur | Intensity slider (1-20) |
| Box Blur | Radius slider (1-15) |
| Motion Blur | Angle slider (0-360°), Intensity slider |
| Sharpen | Strength slider (0.1-3.0) |
| Edge Detection | Threshold slider, Show original toggle |
| Invert/Grayscale | No additional controls |

**Global Controls**:

- Enable/disable processing toggle
- FPS counter (show WASM performance)
- Side-by-side comparison mode (original vs processed)
- Screenshot button to save current frame

**Task 6.4: Add 3D Display Mode** (Promptable)

- Toggle between 2D canvas and 3D Three.js display
- 3D options: flat plane, sphere wrap, wavy animated surface
- Rotation/zoom controls for 3D view

---

### Phase 7: Docker & Deployment

**Task 7.1: Create Dockerfiles** (Promptable)

- Multi-stage Dockerfile for each app (build + nginx)
- Optimize for small image size
- Handle pnpm workspace properly in Docker context

**Task 7.2: Docker Compose Setup** (Promptable)

- Create `docker-compose.yml` for local development
- Run all apps on different ports
- Add nginx reverse proxy (optional) for unified entry point

**Task 7.3: GitHub Actions CI** (Promptable)

- Create `.github/workflows/ci.yml`
- Run lint, type-check, tests on all PRs
- Cache pnpm dependencies

**Task 7.4: GitHub Actions Deploy** (Promptable)

- Create `.github/workflows/deploy.yml`
- Build Docker images on merge to main
- Push to container registry (GitHub Container Registry or Docker Hub)

---

## Suggested Task Order for Prompting

| #   | Task    | Prompt Summary                                                          |
| --- | ------- | ----------------------------------------------------------------------- |
| 1   | 1.1     | "Initialize a pnpm + Turborepo monorepo with TypeScript"                |
| 2   | 1.2     | "Add ESLint, Prettier, husky pre-commit hooks"                          |
| 3   | 2.1     | "Create the @genweb/ui library with Vite + Tailwind"                    |
| 4   | 2.2     | "Implement Button, Input, Card, Modal, Badge, Table components"         |
| 5   | 2.3     | "Add Vitest tests for UI components"                                    |
| 6   | 3.1-3.3 | "Create data-explorer app with file upload and data table"              |
| 7   | 4.1-4.3 | "Create chat-ui app with message list and mock responses"               |
| 8   | 5.1     | "Create Rust WASM library wrapping Photon-rs for image filters"         |
| 9   | 5.2     | "Create TypeScript wrapper for WASM filters library"                    |
| 10  | 6.1-6.4 | "Create video-fx app with webcam, filter control panel, and 3D display" |
| 11  | 7.1-7.2 | "Add Dockerfiles and docker-compose.yml for all apps"                   |
| 12  | 7.3-7.4 | "Create GitHub Actions CI/CD workflows"                                 |
| 13  | Docs    | "Copy planning doc to project and write README"                         |

---

## What to Do Manually vs. Prompt

### Better Done Manually

- Initial GitHub repo creation
- Setting up container registry credentials as GitHub secrets
- Final README polish and personal touches
- Installing Rust/wasm-pack toolchain locally
- Any design tweaks to make it "yours"

### Better to Prompt

- All boilerplate/scaffolding
- Component implementations
- Test file generation
- Rust WASM code
- Docker and CI/CD configurations

---

## Key Demonstration Points

This project demonstrates:

1. **Build System**: Turborepo orchestrates builds across JS and Rust packages
2. **Code Sharing**: UI library consumed by 3 apps, WASM library by video-fx app
3. **Testing**: Vitest with coverage across packages
4. **Type Safety**: Strict TypeScript throughout, including WASM bindings
5. **Docker**: Multi-stage builds, docker-compose orchestration
6. **CI/CD**: Automated testing and container deployment
7. **WASM**: Real Rust → WASM pipeline with practical use case

---

## Verification Plan

1. `pnpm install` - all dependencies resolve
2. `pnpm build` - all packages build (including WASM)
3. `pnpm test` - all tests pass
4. `pnpm lint` - no linting errors
5. `pnpm dev --filter=data-explorer` - app runs locally
6. `pnpm dev --filter=video-fx` - webcam + WASM works
7. `docker-compose up` - all apps run in containers
8. Push to GitHub - CI passes
9. Merge to main - Docker images built and pushed

---

## Prerequisites to Install

- Node.js 20+ (recommend using nvm)
- pnpm (`npm install -g pnpm`)
- Rust + Cargo (https://rustup.rs/)
- wasm-pack (`cargo install wasm-pack`)
- Docker Desktop
