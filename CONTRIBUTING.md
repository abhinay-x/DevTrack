# Contributing to DevTrack

Thank you for your interest in contributing to DevTrack! This document provides guidelines and information for contributors.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/abhinay-x/DevTrack.git
   cd DevTrack
   ```

3. Install dependencies:
   ```bash
   # Server dependencies
   cd server
   npm install
   
   # Client dependencies
   cd ../client
   npm install
   ```

4. Create environment files:
   ```bash
   # Server
   cd server
   cp .env.example .env
   # Edit .env with your configuration
   
   # Client
   cd ../client
   echo "VITE_API_URL=http://localhost:5000" > .env
   ```

5. Start development servers:
   ```bash
   # Terminal 1 - Server
   cd server
   npm run dev
   
   # Terminal 2 - Client
   cd client
   npm run dev
   ```

## Development Guidelines

### Code Style

- Use ESLint configuration provided
- Follow existing patterns in the codebase
- Use meaningful variable and function names
- Add comments for complex logic

### Commit Messages

Use conventional commits format:
- `feat:` new features
- `fix:` bug fixes
- `docs:` documentation changes
- `style:` formatting changes
- `refactor:` code refactoring
- `test:` adding tests
- `chore:` maintenance tasks

### Pull Requests

1. Create a feature branch from `main`
2. Make your changes
3. Add tests if applicable
4. Update documentation
5. Submit PR with clear description

### Testing

```bash
# Run server tests
cd server
npm test

# Run client tests
cd client
npm test
```

## Project Structure

```
DevTrack/
├── server/           # Express.js backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── config/
│   └── tests/
└── client/           # React frontend
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── context/
    │   └── utils/
    └── tests/
```

## API Documentation

API documentation is available at `/api-docs` when running the server.

## Issues

- Use GitHub Issues for bug reports
- Use feature requests for new features
- Provide clear reproduction steps for bugs

## Questions?

Feel free to open an issue for questions or discussions.
