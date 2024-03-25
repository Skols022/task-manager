import { combineReducers } from '@reduxjs/toolkit';
import taskReducer from '../features/tasks/taskSlice';

export const rootReducer = combineReducers({
  tasks: taskReducer,
});