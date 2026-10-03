# Gather Project Workspace

A responsive, frontend-only project management workspace built with React, Vite, Redux Toolkit, and styled-components. Tasks are sample data and are saved in the browser with `localStorage`; there is no API or server dependency.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build`.

## Structure

- `src/pages/`: screen composition and presentation.
- `src/components/`: reusable workspace UI and shared primitives.
- `src/hooks/`: Redux selectors, browser persistence, and page workflows.
- `src/redux/`: Redux Toolkit slice and store.
- `src/data/`: starter task data, current profile, project and board configuration.
- `src/theme.js`: semantic color tokens for light and dark themes.

The signed-in profile is configured in `src/data/workspaceConfig.js`. Previously saved tasks assigned to the starter profile are migrated to Afroj Shaik on load.

## Code rules

- Keep pages focused on presentation and composition. Put reusable behavior in custom hooks and reusable visuals in components.
- Keep Redux reducers synchronous and side-effect free. Put browser storage and UI workflows in hooks.
- Use semantic token names through the styled-components theme; do not hard-code UI colors in feature screens.
- Keep styles in styled-components. Do not add standalone CSS files.
- Use PascalCase for components, `use`-prefixed camelCase for hooks, and descriptive names for state and handlers.
- Give icon-only controls accessible names, use semantic HTML, and preserve keyboard-visible focus states.
- Keep project data local. Do not add API calls or server dependencies to this frontend-only app.
