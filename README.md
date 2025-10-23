# Hauskat Mission Control

> The Emotional Operating System for Cat Care

A comprehensive mission control dashboard built with React and Electron for managing the Hauskat project - from strategic planning to execution.

![Version](https://img.shields.io/badge/version-4.5.0-purple)
![License](https://img.shields.io/badge/license-MIT-blue)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![Electron](https://img.shields.io/badge/Electron-28.1.0-47848F?logo=electron)

---

## Features

- **17 Comprehensive Sections** covering strategy, development, and execution
- **Real-time Progress Tracking** with persistent localStorage
- **Developer-Focused Tools** including sprint boards and technical specs
- **Beautiful UI** built with Tailwind CSS
- **Cross-Platform** desktop application (Mac, Windows, Linux)
- **Auto-Updates** with electron-updater integration
- **Offline-First** with local data persistence

---

## Quick Start

### Prerequisites

- Node.js 20.11.0 or higher (see `.nvmrc`)
- npm or yarn
- macOS, Windows, or Linux

### Installation

```bash
# Clone the repository
git clone https://github.com/milliecat/hauskat-mission-control.git
cd hauskat-mission-control

# Install dependencies
npm install

# Run in development mode
npm run electron:dev
```

### Building

```bash
# Build for production
npm run electron:build

# Package for macOS
npm run package
```

---

## Project Structure

```
hauskat-mission-control/
├── electron/              # Electron main process
│   ├── main.js           # Main process entry
│   └── preload.js        # Preload script (secure IPC)
├── src/
│   ├── components/       # React components
│   │   ├── sections/    # Section components (lazy-loaded)
│   │   ├── ErrorBoundary.jsx
│   │   └── Sidebar.jsx
│   ├── hooks/           # Custom React hooks
│   │   └── useMissionControl.js
│   ├── utils/           # Utility functions
│   │   └── storage.js   # Enhanced localStorage utilities
│   ├── constants/       # App constants
│   │   └── sections.js  # Section configurations
│   ├── test/            # Test setup
│   ├── App.jsx          # Root component
│   ├── MissionControl.jsx # Main container
│   └── main.jsx         # React entry point
├── docs/                # Documentation
├── public/              # Static assets
└── [config files]       # Various configuration files
```

---

## Available Scripts

### Development
```bash
npm run dev              # Start Vite dev server
npm run electron:dev     # Start Electron in dev mode
```

### Production
```bash
npm run build            # Build for production
npm run electron:build   # Build Electron app
npm run package          # Create distributable package
```

### Code Quality
```bash
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
npm run type-check       # Run TypeScript type checking
```

### Testing
```bash
npm test                 # Run tests
npm run test:ui          # Run tests with UI
npm run test:coverage    # Generate coverage report
```

---

## Documentation

- **[Quick Start Guide](docs/QUICK-START-V4.5.md)** - Get started quickly
- **[App Documentation](docs/APP_README.md)** - Detailed app features
- **[Auto-Update Guide](docs/AUTO-UPDATE-GUIDE.md)** - Setup auto-updates
- **[Contributing](CONTRIBUTING.md)** - How to contribute

---

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Support

For issues, questions, or suggestions:
- Create an issue on GitHub
- Check the documentation in `/docs`

---

*Last Updated: October 23, 2025*
