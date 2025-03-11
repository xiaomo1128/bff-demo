# BFF-Demo

A Backend-For-Frontend (BFF) application demo built with Koa.js and TypeScript.

## Technologies

- **Koa.js** - Lightweight web framework for Node.js
- **TypeScript** - Typed JavaScript
- **Awilix** - Dependency injection container
- **Swig** - Template engine
- **Rollup/Webpack** - Module bundlers

## Prerequisites

- Node.js (v20.x)
- yarn

## Installation

```bash
# Clone the repository
git clone https://github.com/xiaomo1128/bff-demo
cd bff-demo

# Install dependencies
npm i yarn@1.22.19 -g
yarn install
```

## Usage

### Development

```bash
# Start development server with hot-reloading （node配置了NODE_ENV环境变量）
yarn dev

# Start development server with NODE_ENV set to development（没配置环境变量）
yarn node:dev
```

### Build

```bash
# Build using Rollup
yarn build:rollup

# Build using Webpack
yarn build:webpack
```

### Deployment

```bash
# Run deployment script
yarn deploy
```

## Project Structure

```
bff-demo/
├── app.ts              # Application entry point
├── package.json        # Project dependencies
├── tsconfig.json       # TypeScript configuration
├── rollup.config.js    # Rollup configuration
├── webpack.config.js   # Webpack configuration
├── deploy.sh           # Deployment script
└── src/
    ├── controllers/    # Request handlers
    ├── services/       # Business logic
    ├── interfaces/     # TypeScript interfaces
    ├── middleware/     # Koa middleware
    ├── models/         # Data models
    ├── utils/          # Utility functions
    └── views/          # Swig templates
```

## Features

- Server-side rendering with Swig templates
- Static file serving
- Dependency injection with Awilix
- SPA history mode support
- Serverless deployment support
- Comprehensive logging with log4js

## License

ISC

## Author

[xiaomo1128]

