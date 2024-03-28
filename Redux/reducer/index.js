// reducers/index.js

import { combineReducers } from 'redux';
import tasksReducer from './taskRecucer';

const rootReducer = combineReducers({
  tasks: tasksReducer,
});

export default rootReducer;
