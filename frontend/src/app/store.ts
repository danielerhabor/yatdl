import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '../features/modalSlice';

export const store = configureStore({
  reducer: {
    modal: modalReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// infer the `AppDispatch` type from the store's `dispatch` method
export type AppDispatch = typeof store.dispatch;
