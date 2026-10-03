import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser, projects } from '../data/workspaceConfig.js';
import { addTask, hydrate, moveTask, setProject, setSearch, setView } from '../redux/tasksSlice.js';

function migrateSavedWorkspace(saved) {
  if (!Array.isArray(saved?.tasks)) return null;

  return {
    ...saved,
    tasks: saved.tasks.map((task) =>
      task.assignee === 'Alex Morgan'
        ? { ...task, assignee: currentUser.name, initials: currentUser.initials }
        : task,
    ),
  };
}

export function useWorkspace() {
  const dispatch = useDispatch();
  const { tasks, activeProjectId, activeView, search } = useSelector((state) => state.workspace);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('gather-workspace');
      if (saved) dispatch(hydrate(migrateSavedWorkspace(JSON.parse(saved))));
    } catch {
      dispatch(hydrate(null));
    }
    setHydrated(true);
  }, [dispatch]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        'gather-workspace',
        JSON.stringify({ tasks, activeProjectId, activeView }),
      );
    } catch {
      // The workspace remains usable when browser storage is unavailable.
    }
  }, [tasks, activeProjectId, activeView, hydrated]);

  const visibleTasks = useMemo(() => {
    const query = search.trim().toLowerCase();
    return tasks.filter((task) => {
      const matchesProject = activeProjectId === 'all' || task.projectId === activeProjectId;
      const matchesSearch =
        !query ||
        `${task.title} ${task.assignee} ${task.tags.join(' ')}`.toLowerCase().includes(query);
      return matchesProject && matchesSearch;
    });
  }, [tasks, activeProjectId, search]);

  const addNewTask = (task) => {
    const projectId =
      task.projectId ?? (activeProjectId === 'all' ? 'project-product' : activeProjectId);
    dispatch(addTask({ ...task, projectId }));
  };

  return {
    tasks: visibleTasks,
    allTasks: tasks,
    activeProjectId,
    activeView,
    search,
    hydrated,
    project: projects.find((project) => project.id === activeProjectId) ?? projects[0],
    currentUser,
    stats: {
      open: tasks.filter((task) => task.status !== 'done').length,
      inProgress: tasks.filter((task) => task.status === 'in-progress').length,
      completed: tasks.filter((task) => task.status === 'done').length,
    },
    selectProject: (id) => dispatch(setProject(id)),
    selectView: (view) => dispatch(setView(view)),
    searchTasks: (value) => dispatch(setSearch(value)),
    moveTask: (id, status) => dispatch(moveTask({ id, status })),
    addTask: addNewTask,
  };
}
