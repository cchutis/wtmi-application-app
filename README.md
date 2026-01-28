# convention-form-app

A Vite + React + TypeScript application for building and running a convention form experience. The app uses Material UI for UI components and react-hook-form for form management.

## Requirements

- Node.js 18 or later
- Yarn or npm

## Getting Started

1. Install dependencies

```bash
# with yarn
yarn install

# or with npm
npm install
```

2. Start the development server

```bash
# starts Vite dev server on http://localhost:5173 (by default)
yarn dev
# or
npm run dev
```

3. Build for production

```bash
yarn build
# or
npm run build
```

4. Preview the production build locally

```bash
yarn preview
# or
npm run preview
```

5. Lint the project

```bash
yarn lint
# or
npm run lint
```

## Tech Stack

- React 18
- TypeScript
- Vite 5
- Material UI (MUI)
- react-hook-form
- ESLint (TypeScript + React plugins)

## Available Scripts

- `dev`: Run the Vite development server
- `build`: Type-check with TypeScript and build the app
- `preview`: Preview the built app with a local web server
- `lint`: Run ESLint on the codebase

## Project Structure

```
.
├── index.html
├── src/
│   ├── (application source code)
│   └── ...
├── tsconfig.json
├── vite.config.ts
├── package.json
└── README.md
```

Your primary application code lives under `src/`. The entry HTML file is `index.html`. Vite configuration is in `vite.config.ts`.

## Notes

- This project is configured as an ES module (`"type": "module"`).
- Adjust Node and package manager versions as needed for your environment.

## License

Add a license here if applicable.
