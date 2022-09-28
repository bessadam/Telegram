import { createSlice } from "@reduxjs/toolkit";

const activeModalWindow = createSlice({
  name: "activeModalWindow",
  initialState: {
    isActive: false,
  },
  reducers: {
    setModalWindowActive(state, action) {
      state.isActive = action.payload.active;
    }
  }
})

export const { setModalWindowActive } = activeModalWindow.actions;

export default activeModalWindow.reducer;