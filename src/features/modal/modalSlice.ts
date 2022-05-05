import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ModalState {
  value: boolean;
}

const initialState: ModalState = {
  value: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state) => {
      /* open the modal by set it's state to `true`  */
      state.value = true;
    },
    close: (state) => {
      /* close the modal by set it's state to `false`  */
      state.value = false;
    },
    openOrClose: (state, action: PayloadAction<boolean>) => {
      /* open or close the modal by set it's state to `action.payload` which 
        is true or false
      */
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { open, close, openOrClose } = modalSlice.actions;

export default modalSlice.reducer;
