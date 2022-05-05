import { configureStore } from '@reduxjs/toolkit'
import modalReducer from '../features/modal/modalSlice'


export const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {modal: ModalState}
export type AppDispatch = typeof store.dispatch