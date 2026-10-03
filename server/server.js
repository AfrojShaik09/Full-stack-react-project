const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const { readStore, updateStore, createId } = require('./store');

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_request, response) => response.json({ status: 'ok', service: 'collabflow-api' }));

app.get('/api/overview', (_request, response) => {
  const store = readStore();
  const tasks = store.tasks;
  response.json({
    workspace: store.workspace,
    projects: store.projects,
    tasks,
    members: store.members,
    activity: store.activity.slice(0, 8),
    metrics: {
      activeProjects: store.projects.filter((project) => project.status === 'active').length,
      openTasks: tasks.filter((task) => task.status !== 'done').length,
      completedThisWeek: tasks.filter((task) => task.status === 'done').length,
      teamMembers: store.members.length
    }
  });
});

app.post('/api/tasks', (request, response) => {
  const { title, projectId, priority = 'medium', assigneeId = null } = request.body;
  if (!title || !projectId) return response.status(400).json({ error: 'Title and project are required.' });
  const store = readStore();
  const task = {
    id: createId('task'),
    title: title.trim(),
    projectId,
    priority,
    assigneeId,
    status: 'todo',
    dueDate: '2026-10-02',
    createdAt: new Date().toISOString()
  };
  store.tasks.unshift(task);
  store.activity.unshift({ id: createId('activity'), actor: 'You', action: 'created', subject: task.title, timestamp: new Date().toISOString(), color: '#e07051' });
  updateStore(store);
  io.emit('task:created', task);
  io.emit('activity:created', store.activity[0]);
  response.status(201).json(task);
});

app.patch('/api/tasks/:taskId', (request, response) => {
  const store = readStore();
  const task = store.tasks.find((item) => item.id === request.params.taskId);
  if (!task) return response.status(404).json({ error: 'Task not found.' });
  const allowedFields = ['status', 'priority', 'assigneeId', 'title'];
  allowedFields.forEach((field) => {
    if (request.body[field] !== undefined) task[field] = request.body[field];
  });
  store.activity.unshift({ id: createId('activity'), actor: 'You', action: 'updated', subject: task.title, timestamp: new Date().toISOString(), color: '#477c70' });
  updateStore(store);
  io.emit('task:updated', task);
  io.emit('activity:created', store.activity[0]);
  response.json(task);
});

app.post('/api/comments', (request, response) => {
  const { taskId, text } = request.body;
  if (!taskId || !text) return response.status(400).json({ error: 'Task and comment text are required.' });
  const store = readStore();
  const comment = { id: createId('comment'), taskId, text: text.trim(), author: 'You', createdAt: new Date().toISOString() };
  store.comments.unshift(comment);
  updateStore(store);
  io.emit('comment:created', comment);
  response.status(201).json(comment);
});

io.on('connection', (socket) => {
  socket.emit('connection:ready', { message: 'Live collaboration connected.' });
});

httpServer.listen(port, () => console.log(`CollabFlow API running at http://localhost:${port}`));
