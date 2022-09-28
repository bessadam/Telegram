import { createSlice } from "@reduxjs/toolkit";
//db
import { controlGroup } from "../db/dbControlGroup";

interface ControlGroupI {
  id: number;
  name: string;
  icon: Object;
  component: any;
}

interface switchSideMenuI {
  sideMenuCategories: ControlGroupI[];
  currentSideMenuCategory?: ControlGroupI;
  isActive: boolean;
  switchAnimation: boolean;
}

/*
  controlGroup[index] - current side menu group
  0 - contacts
  1 - calls
  2 - chats
  3 - settings
*/
const initialState: switchSideMenuI = {
  sideMenuCategories: controlGroup,
  currentSideMenuCategory: controlGroup[2],
  isActive: true,
  switchAnimation: true,
}

const switchSideMenu = createSlice({
  name: "switchSideMenu",
  initialState,
  reducers: {
    setSideMenu(state, action) {
      state.currentSideMenuCategory = state.sideMenuCategories.find(item => item.id === action.payload.id);
    }, 
    setSideMenuActive(state, action) {
      state.isActive = action.payload.active;
    },
    setSwitchAnimation(state, action) {
      state.switchAnimation = action.payload.active;
    }
  }
})

export const { setSideMenu, setSideMenuActive, setSwitchAnimation } = switchSideMenu.actions;

export default switchSideMenu.reducer;