import { configureStore } from '@reduxjs/toolkit';
import workspaceReducer from './tasksSlice.js';

export const store = configureStore({
  reducer: { workspace: workspaceReducer },
});
