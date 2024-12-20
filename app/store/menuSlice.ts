import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MenuState {
  menus: any[];
}

const initialState: MenuState = {
  menus: [],
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenus: (state, action: PayloadAction<any[]>) => {
      state.menus = action.payload;
    },
    addMenu: (state, action: PayloadAction<any>) => {
      state.menus.push(action.payload);
    },
  },
});

export const { setMenus, addMenu } = menuSlice.actions;
export default menuSlice.reducer;
