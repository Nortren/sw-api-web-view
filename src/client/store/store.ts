import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { toolsSliceReducer } from './tools/tools';
import { userListSliceReducer } from './userList/userList';

const rootReducer = combineReducers({
  toolsReducer: toolsSliceReducer,
  userListReducer: userListSliceReducer,
});

export const store = configureStore({
  reducer: {
    mainReducer: rootReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type TypeRootState = ReturnType<typeof store.getState>;
