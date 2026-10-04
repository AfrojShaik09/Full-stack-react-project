# Gather Project Workspace

A responsive project-management workspace with a React frontend and a separate Express API prototype. The frontend supports task planning across projects; the API exposes workspace, task, and comment endpoints for development.

> The frontend and API are not currently connected. The frontend reads and writes its tasks in browser `localStorage`; the API stores its own data in a JSON file on the server.

## Features

- Organize tasks by project and status in a draggable board, a list, or a calendar view.
- Search tasks by title, assignee, or tag, and view tasks assigned to the current user.
- Create tasks, update their status, and persist workspace changes in the browser.
- Switch between light and dark themes.
- Run the optional API separately for endpoint development and health checks.

## Requirements

- Node.js and npm

## Run the frontend

The frontend has its own package in `project-management-workspace`. From the repository root:

```sh
cd project-management-workspace
npm install
npm run dev
```

Open [http://127.0.0.1:5174/](http://127.0.0.1:5174/).

To create and preview a production build:

```sh
npm run build
npm run preview
```

Run these commands from `project-management-workspace` as well.

## Run the API

The API is optional and can be run in a second terminal from the repository root:

```sh
npm install
npm run server
```

It listens on port `4000` by default. Set the `PORT` environment variable to use a different port. Check that it is running with:

```text
http://localhost:4000/api/health
```

Available HTTP endpoints:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/health` | API health check |
| `GET` | `/api/overview` | Workspace, projects, tasks, members, activity, and metrics |
| `POST` | `/api/tasks` | Create a task; requires `title` and `projectId` |
| `PATCH` | `/api/tasks/:taskId` | Update a task's `status`, `priority`, `assigneeId`, or `title` |
| `POST` | `/api/comments` | Add a comment; requires `taskId` and `text` |

The API also emits Socket.IO events for new or updated tasks, new activity, and new comments. Its JSON data file is created at `server/data/collabflow.json` the first time the store is accessed.

## Project layout

```text
server/                         Express and Socket.IO API prototype
  server.js                     HTTP routes and socket events
  store.js                      JSON-file persistence
project-management-workspace/   React frontend package
  src/components/               Reusable workspace UI
  src/data/                     Sample tasks and workspace configuration
  src/hooks/                     Workspace state and page behavior
  src/pages/                     Workspace screen
  src/redux/                     Redux Toolkit state
  src/theme/                     Workspace theme overrides
  src/tokens/                    Design tokens
```

## Notes

- Frontend tasks are saved in the browser under the `gather-workspace` local-storage key. Clearing browser storage removes those local changes.
- The API uses a separate JSON file and does not currently synchronize with the frontend.
- The frontend's own README is in [`project-management-workspace/README.md`](project-management-workspace/README.md).
