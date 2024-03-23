import { combineReducers } from '@reduxjs/toolkit';
import taskReducer from '../features/taskSlice';

export const rootReducer = combineReducers({
  tasks: taskReducer,
});