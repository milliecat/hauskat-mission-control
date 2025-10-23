# Contributing to Hauskat Mission Control

Thank you for your interest in contributing to Hauskat Mission Control! This document provides guidelines and instructions for contributing.

## Development Setup

### Prerequisites

- Node.js 20.11.0 or higher (use `.nvmrc` for version management)
- npm or yarn package manager
- Git

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/milliecat/hauskat-mission-control.git
   cd hauskat-mission-control
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env
   ```

4. **Run development server**
   ```bash
   npm run electron:dev
   ```

## Code Quality

### Linting and Formatting

We use ESLint and Prettier to maintain code quality:

```bash
# Run ESLint
npm run lint

# Format code with Prettier
npm run format

# Check formatting
npm run format:check
```

### Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Coding Standards

### JavaScript/TypeScript

- Use ES6+ features
- Follow the Airbnb style guide
- Add JSDoc comments for complex functions
- Prefer functional components over class components
- Use hooks for state management

### React Best Practices

- Keep components small and focused
- Use PropTypes or TypeScript for type checking
- Implement error boundaries for critical sections
- Use React.memo for expensive components
- Follow accessibility guidelines (ARIA labels, keyboard navigation)

### File Organization

```
src/
├── components/        # Reusable UI components
├── pages/            # Page-level components
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── types/            # TypeScript type definitions
└── constants/        # Application constants
```

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: code style changes (formatting, etc.)
refactor: code refactoring
test: adding or updating tests
chore: maintenance tasks
```

Examples:
```
feat: add dark mode toggle to settings
fix: resolve memory leak in mission control component
docs: update installation instructions
```

## Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, documented code
   - Add tests for new features
   - Update documentation as needed

3. **Test your changes**
   ```bash
   npm test
   npm run lint
   npm run build
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a pull request**
   - Provide a clear description of changes
   - Reference any related issues
   - Ensure CI checks pass

## Issue Reporting

### Bug Reports

Include:
- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details (OS, Node version, etc.)

### Feature Requests

Include:
- Clear description of the feature
- Use case and benefits
- Proposed implementation (optional)
- Alternative approaches considered

## Security

If you discover a security vulnerability, please email security@hauskat.com instead of creating a public issue.

## Questions?

Feel free to open a discussion or reach out to the maintainers.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
