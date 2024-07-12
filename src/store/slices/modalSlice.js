import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state) => {
      state.modal = !state.modal;
    },
  },
});

export const { showModal } = modalSlice.actions;

export default modalSlice.reducer;
