# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Kingdom Pilot is a Chrome Manifest V3 extension for MyLands game players that intercepts and analyzes game API responses. The extension uses TypeScript, React, and Bun as the runtime.

## Commands

### Development
- `bun run dev` - Start development server with hot reload and file watching
- `bun run build` - Production build (cleans and builds extension)
- `bun run build:watch` - Watch mode for build script

### Code Quality
- `bun run check` - Format, lint, and type-check (runs format, lint:fix, typecheck)
- `bun run typecheck` - TypeScript type checking only
- `bun run lint` - Run ESLint
- `bun run lint:fix` - Run ESLint with auto-fix
- `bun run format` - Format code with Prettier

### Testing
Tests are not yet configured (`bun run test` will echo placeholder message).

## Architecture

### Extension Structure
The extension follows Chrome Manifest V3 architecture with three main entry points:
- **Background Service Worker** (`background-entry.ts`) - Runs background tasks and heartbeat
- **Content Script** (`inject-entry.ts`) - Injected into MyLands game pages to intercept responses
- **Popup Interface** (`popup-entry.tsx`) - React-based popup UI

### Build System
Custom Bun-based build system (`build.ts`) that:
- Bundles TypeScript/React code using Bun's bundler
- Copies static files (manifest.json, popup.html, icons)
- Supports development mode with file watching and auto-rebuild
- Outputs to `build/` directory for Chrome extension loading

### Key Directories
- `src/extension/` - Chrome extension specific code (background, content, popup)
- `src/types/` - TypeScript type definitions, including game entity types
- `src/ui/` - React components and UI logic
- `src/utils/` - Shared utilities including Logger class
- `build/` - Output directory for built extension files

### Game Integration
The extension intercepts 14+ different MyLands game entity types defined in `src/types/game.ts`, including users, kingdoms, cities, missions, and various game actions.

### TypeScript Configuration
Uses path aliases for imports:
- `@/*` - src/
- `@/core/*` - src/core/
- `@/ui/*` - src/ui/
- `@/extension/*` - src/extension/
- `@/types/*` - src/types/
- `@/utils/*` - src/utils/

## Extension Loading
1. Run `bun run build`
2. Open `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select `build/` directory