import { createSlice, nanoid } from '@reduxjs/toolkit';
import { initialWorkspaceState } from '../data/initialWorkspaceState.js';

const tasksSlice = createSlice({
  name: 'workspace',
  initialState: initialWorkspaceState,
  reducers: {
    setProject(state, action) {
      state.activeProjectId = action.payload;
    },
    setView(state, action) {
      state.activeView = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    moveTask(state, action) {
      const task = state.tasks.find((item) => item.id === action.payload.id);
      if (task) task.status = action.payload.status;
    },
    addTask: {
      reducer(state, action) {
        state.tasks.unshift(action.payload);
      },
      prepare(task) {
        return { payload: { ...task, id: nanoid() } };
      },
    },
    hydrate(state, action) {
      if (action.payload?.tasks?.length) {
        state.tasks = action.payload.tasks;
        state.activeProjectId = action.payload.activeProjectId ?? 'all';
        state.activeView = action.payload.activeView ?? 'board';
      }
    },
  },
});

export const { setProject, setView, setSearch, moveTask, addTask, hydrate } = tasksSlice.actions;
export default tasksSlice.reducer;
