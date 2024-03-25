// taskSlice.ts

import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../utils/api';
import { Task } from '@doist/todoist-api-typescript';

export interface CreateTaskProps {
  description: string;
  assignee_id: string;
  content: string;
  project_id: string;
}

interface TaskState {
  tasks: Task[];
  status?: '' | 'loading' | 'succeeded' | 'failed';
  error?: string | null;
  filter?: {
    status: string;
    assignee: Array<string>;
  };
}

const initialState: TaskState = {
  tasks: [],
  status: '',
  error: null,
  filter: {
    status: '',
    assignee: [],
  }
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilterByStatus: (state, action: PayloadAction<string>) => {
      if (state.filter) {
        state.filter.status = action.payload;
      }
    },
    setFilterByAssignee: (state, action: PayloadAction<string[]>) => {
      if (state.filter) {
        state.filter.assignee = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createNewTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(createNewTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message
      })
      .addCase(closeTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(closeTask.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(closeTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message
      })
      .addCase(reopenTask.pending, (state) => {
          state.status = 'loading';
      })
      .addCase(reopenTask.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(reopenTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message
      })
  }
});

export const { setFilterByStatus, setFilterByAssignee } = taskSlice.actions;

export const createNewTask = createAsyncThunk(
  'addTask',
  async (initialTask: CreateTaskProps) => {
    const response = await api.addTask(initialTask);
    return response;
  }
)

export const closeTask = createAsyncThunk(
  'closeTask',
  async (taskId: string) => {
    const response = await api.closeTask(taskId);
    return response;
  }
)

export const reopenTask = createAsyncThunk(
  'reopenTask',
  async (taskId: string) => {
    const response = await api.reopenTask(taskId);
    return response;
  }
)

export default taskSlice.reducer;