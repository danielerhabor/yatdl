import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types/types';

interface ModalState {
  isOpen: boolean;
  task?: Task;
}

const initialState: ModalState = {
  isOpen: false,
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
    openModalWithTask: (state, action: PayloadAction<Task>) => {
      state.isOpen = true;
      state.task = action.payload;
    }
  },
});

// export the typed reducer and the typed actions
export const { openModal, closeModal, openModalWithTask } = modalSlice.actions;
export default modalSlice.reducer;


