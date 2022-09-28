import { createSlice }  from "@reduxjs/toolkit";

interface ResizeI {
  width: number;
  height: number;
}

const initialState: ResizeI = {
  width: 900,
  height: 525,
}

const handleResize = createSlice({
  name: "handleResize",
  initialState,
  reducers: {
    setResizedWidth(state, action) {
      state.width = action.payload.value;
    },
    setResizedHeight(state, action) {
      state.height = action.payload.value;
    }
  }
})

export const { setResizedWidth, setResizedHeight } = handleResize.actions;

export default handleResize.reducer;