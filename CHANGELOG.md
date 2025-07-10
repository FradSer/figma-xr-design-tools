# Changelog

All notable changes to the XR Design Tools Figma plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - 2025-07-10

### Changed
- **BREAKING**: Upgraded `create-figma-plugin` from v2.1.3 to v4.0.1
- **BREAKING**: Upgraded TypeScript from v4 to v5 (required by new framework version)
- Updated all UI components to use Figma's latest UI3 design system
- Removed deprecated `variant` prop from `TextboxNumeric` components
- Removed deprecated `name` prop from form components
- Updated callback function signatures for better type safety

### Added
- Enhanced ESLint configuration with TypeScript support
- Added `@typescript-eslint/parser` and `@typescript-eslint/eslint-plugin` v5.62.0
- Comprehensive linting rules for TypeScript and React/Preact
- Updated CLAUDE.md with new development commands and manifest guidelines

### Fixed
- Fixed manifest generation errors related to `containsWidget` field
- Resolved TypeScript compilation errors after framework upgrade
- Fixed component prop type mismatches in UI forms
- Corrected callback function parameters in form handlers

### Development
- Node.js v22+ now required (upgraded from v16+)
- Build process now supports `--no-typecheck` flag for Node.js type conflicts
- Improved code formatting with Prettier integration
- All unit tests continue to pass after upgrade

### Technical Notes
- UI components now use UI3 design without `variant` attributes
- Manifest no longer includes `containsWidget` field (plugin-specific, not widget)
- Enhanced type safety with stricter TypeScript configuration
- Maintained backward compatibility for plugin functionality

### Migration Guide
If upgrading an existing installation:
1. Ensure Node.js v22+ is installed
2. Run `npm install` to update dependencies
3. Use `npm run build -- --no-typecheck` if encountering Node.js type conflicts
4. Plugin functionality remains unchanged - no user-facing breaking changes