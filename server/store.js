const fs = require('fs');
const path = require('path');

const dataDirectory = path.join(__dirname, 'data');
const dataFile = path.join(dataDirectory, 'collabflow.json');

const initialStore = {
  workspace: { name: 'Northstar Studio', plan: 'Professional' },
  projects: [
    { id: 'project-website', name: 'Website refresh', description: 'A clearer, faster home for Northstar.', status: 'active', color: '#e07051' },
    { id: 'project-mobile', name: 'Mobile companion', description: 'Bring the studio to every pocket.', status: 'active', color: '#477c70' },
    { id: 'project-brand', name: 'Brand foundations', description: 'A shared language for the next chapter.', status: 'planning', color: '#d9a441' }
  ],
  members: [
    { id: 'member-dana', name: 'Dana Morales', role: 'Product lead', initials: 'DM', color: '#e07051' },
    { id: 'member-maya', name: 'Maya Chen', role: 'Design director', initials: 'MC', color: '#477c70' },
    { id: 'member-jonas', name: 'Jonas Reed', role: 'Engineer', initials: 'JR', color: '#756b9e' },
    { id: 'member-you', name: 'You', role: 'Workspace owner', initials: 'YO', color: '#b97845' }
  ],
  tasks: [
    { id: 'task-1', title: 'Map the new navigation', projectId: 'project-website', priority: 'high', assigneeId: 'member-maya', status: 'in_progress', dueDate: '2026-09-25', createdAt: '2026-09-20T09:00:00.000Z' },
    { id: 'task-2', title: 'Review analytics events', projectId: 'project-website', priority: 'medium', assigneeId: 'member-jonas', status: 'todo', dueDate: '2026-09-27', createdAt: '2026-09-21T09:00:00.000Z' },
    { id: 'task-3', title: 'Write launch checklist', projectId: 'project-mobile', priority: 'low', assigneeId: 'member-dana', status: 'todo', dueDate: '2026-09-29', createdAt: '2026-09-21T09:00:00.000Z' },
    { id: 'task-4', title: 'Ship empty states', projectId: 'project-website', priority: 'medium', assigneeId: 'member-you', status: 'done', dueDate: '2026-09-22', createdAt: '2026-09-18T09:00:00.000Z' },
    { id: 'task-5', title: 'Pair on offline mode', projectId: 'project-mobile', priority: 'high', assigneeId: 'member-jonas', status: 'in_progress', dueDate: '2026-09-30', createdAt: '2026-09-22T09:00:00.000Z' },
    { id: 'task-6', title: 'Choose type scale', projectId: 'project-brand', priority: 'low', assigneeId: 'member-maya', status: 'done', dueDate: '2026-09-23', createdAt: '2026-09-17T09:00:00.000Z' }
  ],
  comments: [],
  activity: [
    { id: 'activity-1', actor: 'Maya Chen', action: 'moved', subject: 'Map the new navigation to In progress', timestamp: '2026-09-23T08:45:00.000Z', color: '#477c70' },
    { id: 'activity-2', actor: 'Jonas Reed', action: 'completed', subject: 'Choose type scale', timestamp: '2026-09-23T08:10:00.000Z', color: '#756b9e' },
    { id: 'activity-3', actor: 'Dana Morales', action: 'commented on', subject: 'Ship empty states', timestamp: '2026-09-22T16:30:00.000Z', color: '#e07051' },
    { id: 'activity-4', actor: 'You', action: 'created', subject: 'Pair on offline mode', timestamp: '2026-09-22T14:05:00.000Z', color: '#b97845' }
  ]
};

function ensureStore() {
  if (!fs.existsSync(dataDirectory)) fs.mkdirSync(dataDirectory, { recursive: true });
  if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, JSON.stringify(initialStore, null, 2));
}
function readStore() { ensureStore(); return JSON.parse(fs.readFileSync(dataFile, 'utf8')); }
function updateStore(store) { fs.writeFileSync(dataFile, JSON.stringify(store, null, 2)); }
function createId(prefix) { return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`; }

module.exports = { readStore, updateStore, createId };
