import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './features/board/boardSlice';
import rackReducer from './features/rack/rackSlice';
import sackReducer from './features/sack/sackSlice';

const store = configureStore({
  reducer: {
    board: boardReducer,
    rack: rackReducer,
    sack: sackReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
