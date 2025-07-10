# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Figma plugin for XR (Extended Reality) design tools, built with the Create Figma Plugin framework. The plugin provides two main features:
1. **FOV Guide Generator** - Creates visual guides based on field-of-view calculations
2. **FOV Calculator** - Calculates FOV from element dimensions and distance

## Common Commands

### Development
- `pnpm build` - Build the plugin with typecheck and minification
- `pnpm build -- --no-typecheck` - Build without typecheck (use if Node.js type conflicts occur)
- `pnpm watch` - Build in watch mode with typecheck for development
- `pnpm test` - Run Jest unit tests
- `pnpm format` - Format TypeScript/TSX files with Prettier

### Linting and Code Quality
- `pnpm eslint "src/**/*.{ts,tsx}"` - Run ESLint on TypeScript files
- `pnpm format` - Format TypeScript/TSX files with Prettier
- ESLint configuration extends recommended, TypeScript, React, and Prettier rules
- Prettier is configured with TypeScript parser, 2-space tabs, single quotes, 80-char width, no semicolons

## Architecture

### Plugin Structure
The plugin follows Create Figma Plugin conventions with separate main/UI entry points:

- **FOV Guide Generator**: `src/fov-guide-generator/`
  - `main.ts` - Figma main thread logic, creates rectangle guides with FOV calculations
  - `ui.tsx` - Preact UI for input (horizontal FOV, vertical FOV, distance, naming options)

- **FOV Calculator**: `src/fov-calculator/`
  - `main.ts` - Calculates FOV from selected element dimensions
  - `ui.tsx` - Preact UI for distance input and results display

### Core Utilities
- `src/utilities/settings.ts` - Plugin settings with defaults (60° H, 30° V, 36cm distance)
- `src/utilities/types.ts` - Shared TypeScript interfaces
- `src/common/by-frad.tsx` - Brand component

### Mathematical Functions
- `convert-fov-distance-to-length.ts` - Converts FOV + distance to pixel dimensions
- `convert-length-distance-to-fov.ts` - Converts pixel dimensions + distance to FOV

### Testing
- Unit tests in `tests/unit/` for mathematical conversion functions
- Jest configuration with ts-jest preset for TypeScript support

### Key Dependencies
- `@create-figma-plugin/*` - Framework for Figma plugin development
- `preact` - Lightweight React alternative for UI
- `typescript` + `@figma/plugin-typings` - Type safety

## Development Notes

- Plugin uses Preact hooks (`useState`, `useEffect`) and Create Figma Plugin utilities (`useForm`, `emit`, `on`)
- Settings are persisted using plugin framework's `loadSettingsAsync`/`saveSettingsAsync`
- UI communicates with main thread via event handlers (`SUBMIT`, `CLOSE_UI`, `SELECTION_CHANGED`)
- Rectangle guides are created with red fill, 25% opacity, centered constraints, and locked by default

## Important: Manifest Configuration

- DO NOT manually edit `manifest.json` - it's auto-generated from `package.json`
- DO NOT include `containsWidget` field for regular Figma plugins (only for widgets)
- The plugin configuration in `package.json` under `figma-plugin` key generates the manifest
- If you get manifest errors, check the `figma-plugin` configuration, not the manifest file directly