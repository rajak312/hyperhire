import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Menu {
  id: string;
  name: string;
  depth: number;
  parentId?: string | null;
  children?: Menu[];
  createdAt?: string;
  updatedAt?: string;
}

export interface MenuState {
  menus: Menu[];
  loading: boolean;
  error?: string;
}

const initialState: MenuState = {
  menus: [],
  loading: false,
  error: undefined,
};

export const fetchMenus = createAsyncThunk("menu/fetchMenus", async () => {
  const response = await axios.get("/api/menus");
  return response.data;
});

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenus.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMenus.fulfilled, (state, action) => {
        state.menus = action.payload;
        state.loading = false;
      })
      .addCase(fetchMenus.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default menuSlice.reducer;
