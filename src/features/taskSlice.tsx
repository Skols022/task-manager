// taskSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../app/store';

interface Task {
  id: number;
  name: string;
  description: string;
  assignee: string;
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
  },
});

export const { addTask, updateTask } = taskSlice.actions;

export const selectTasks = (state: RootState) => state.tasks.tasks;

export const createTask = (task: Task) => (dispatch: AppDispatch) => {
  dispatch(addTask(task));
};

export const changeTask = (task: Task) => (dispatch: AppDispatch) => {
  dispatch(updateTask(task));
};

export default taskSlice.reducer;