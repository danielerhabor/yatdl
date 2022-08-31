import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoUI } from '../types/types';

interface ModalState {
  isOpen: boolean;
  todo?: TodoUI;
}

const initialState: ModalState = {
  isOpen: false
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    openModalWithTodo: (state, action: PayloadAction<TodoUI>) => {
      state.isOpen = true;
      state.todo = action.payload;
    }
  }
});

// export the typed reducer and the typed actions
export const { openModal, closeModal, openModalWithTodo } = modalSlice.actions;
export default modalSlice.reducer;
