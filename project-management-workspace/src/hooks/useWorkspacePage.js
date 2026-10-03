import { useEffect, useMemo, useState } from 'react';
import { columns, currentUser, projects } from '../data/workspaceConfig.js';
import { useWorkspace } from './useWorkspace.js';

export function useWorkspacePage() {
  const workspace = useWorkspace();
  const [activeNav, setActiveNav] = useState('overview');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [overColumnId, setOverColumnId] = useState(null);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!toast) return undefined;
    const timeoutId = window.setTimeout(() => setToast(''), 2300);
    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  const visibleTasks = useMemo(
    () =>
      activeNav === 'my-tasks'
        ? workspace.tasks.filter((task) => task.assignee === currentUser.name)
        : workspace.tasks,
    [activeNav, workspace.tasks],
  );

  function navigate(nav, projectId) {
    setActiveNav(nav);
    if (projectId) workspace.selectProject(projectId);
    else if (nav === 'projects' || nav === 'overview') workspace.selectProject('all');
    if (nav === 'calendar') workspace.selectView('calendar');
    else if (nav === 'overview' || nav === 'projects') workspace.selectView('board');
  }

  function createTask(task) {
    workspace.addTask(task);
    setToast('Task added to your workspace');
  }

  function startDragging(event, taskId) {
    event.dataTransfer.effectAllowed = 'move';
    setDraggedTaskId(taskId);
  }

  function dragOverColumn(event, columnId) {
    event.preventDefault();
    setOverColumnId(columnId);
  }

  function endDragging() {
    setDraggedTaskId(null);
    setOverColumnId(null);
  }

  function leaveColumn() {
    setOverColumnId(null);
  }

  function dropTask(event, status) {
    event.preventDefault();
    if (draggedTaskId) workspace.moveTask(draggedTaskId, status);
    endDragging();
  }

  function completeTask(task) {
    workspace.moveTask(task.id, task.status === 'done' ? 'todo' : 'done');
  }

  const dateLabel = new Intl.DateTimeFormat('en', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date());

  return {
    workspace,
    activeNav,
    dialogOpen,
    menuOpen,
    draggedTaskId,
    overColumnId,
    toast,
    columns,
    projects,
    visibleTasks,
    myTaskCount: workspace.allTasks.filter((task) => task.assignee === currentUser.name).length,
    currentProject:
      projects.find((project) => project.id === workspace.activeProjectId) ?? projects[0],
    dateLabel,
    greeting: `Good morning, ${currentUser.name.split(' ')[0]}`,
    navigate,
    createTask,
    startDragging,
    dragOverColumn,
    endDragging,
    leaveColumn,
    dropTask,
    completeTask,
    notify: setToast,
    setDialogOpen,
    setMenuOpen,
    setOverColumnId,
  };
}
