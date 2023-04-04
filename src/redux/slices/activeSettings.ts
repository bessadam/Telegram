import { createSlice }  from "@reduxjs/toolkit";
//db
import { settings } from "../db/dbSettings";

interface SettingsI {
  id: number;
  isActive: boolean;
  currentSettings: any;
}

const initialState: SettingsI = {
  id: 1,
  isActive: false,
  currentSettings: {},
}

const activeSettings = createSlice({
  name: "activeSettings",
  initialState,
  reducers: {
    setSettingsActive(state, action) {
      state.id = action.payload.id;
      state.isActive = action.payload.isActive;
      state.currentSettings = settings.find(item => item.id === action.payload.id);
    },
  }
})

export const { setSettingsActive } = activeSettings.actions;

export default activeSettings.reducer;