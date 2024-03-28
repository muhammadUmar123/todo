// taskActions.js

export const ADD_TASK = 'ADD_TASK';
export const TOGGLE_COMPLETION = 'TOGGLE_COMPLETION';
export const DELETE_TASK = 'DELETE_TASK';

export const addTask = task => ({
  type: ADD_TASK,
  payload: task,
});

export const toggleCompletion = taskId => ({
  type: TOGGLE_COMPLETION,
  payload: taskId,
});

export const deleteTask = taskId => ({
  type: DELETE_TASK,
  payload: taskId,
});
