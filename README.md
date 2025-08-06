# Kingdom Pilot

A Chrome browser extension assistant for MyLands game players.

Modern Chrome extension built with TypeScript, React, and Bun runtime that intercepts and analyzes game responses to help optimize strategy and gameplay.

## Features

- **Response Interception**: Automatically captures and logs MyLands game API responses
- **Game Entity Tracking**: Monitors 14+ different game entities (users, kingdoms, cities, missions, etc.)
- **Modern Architecture**: Built with TypeScript, React, and clean architecture principles
- **Styled Logging**: Beautiful console output with timestamps and color-coded log levels
- **Live Development**: Hot reload development server with file watching

## Tech Stack

- **Runtime**: Bun
- **Language**: TypeScript
- **UI Framework**: React 18
- **Build Tool**: Bun's built-in bundler
- **Code Quality**: ESLint + Prettier
- **Extension**: Chrome Manifest V3

## Development

### Prerequisites

- [Bun](https://bun.sh) runtime installed
- Chrome or Chromium-based browser

### Setup

```bash
# Install dependencies
bun install

# Build the extension
bun run build

# Start development server with hot reload
bun run dev
```

### Loading the Extension

1. Run `bun run build` to build the extension
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the `build/` directory

### Usage

1. Load the extension in Chrome
2. Visit any MyLands game site (mlgame.com, .org, .net)
3. Open browser console to see intercepted game responses
4. Click the extension icon to view the React popup interface

### Available Scripts

```bash
bun run dev          # Development server with hot reload
bun run build        # Production build (clean + build extension)
bun run build:clean  # Clean build directory
bun run build:extension # Build extension only
bun run build:watch  # Watch mode for build script
bun run typecheck    # TypeScript type checking
bun run lint         # Run ESLint
bun run lint:fix     # Run ESLint with auto-fix
bun run format       # Format code with Prettier
bun run check        # Format, lint, and type-check code
bun run test         # Tests (not configured yet)
```

## Project Structure

```
src/
├── extension/      # Chrome extension specific code
│   ├── background/ # Service worker implementation
│   ├── content/    # Content script and injection logic
│   └── popup/      # React popup interface
├── ui/            # React components and UI logic
│   ├── components/ # React components
│   ├── hooks/      # React hooks
│   └── stores/     # State management
├── types/         # TypeScript type definitions
│   ├── extension.ts # Extension-specific types
│   ├── game.ts     # Game entity types
│   └── index.ts    # Type exports
├── utils/         # Shared utilities and helpers
│   ├── logger.ts   # Logging utility
│   └── index.ts    # Utility exports
├── background-entry.ts # Background service worker entry
├── content-entry.ts    # Content script entry
└── inject-entry.ts     # Page injection entry
```

## License

Private project for educational purposes. 