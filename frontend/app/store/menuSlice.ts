import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
  menuTree?: Menu;
  loading: boolean;
  error?: string;
}

const initialState: MenuState = {
  menus: [],
  loading: false,
  error: undefined,
};

export const fetchMenus = createAsyncThunk("menu/fetchMenus", async () => {
  const response = await axios.get(`/api/menus`);
  return response.data;
});

export const fetchMenuById = createAsyncThunk(
  "menu/fetchMenuById",
  async (id: string) => {
    const response = await axios.get(`/api/menus/${id}`);
    return response.data;
  }
);

export const fetchMenuTreeById = createAsyncThunk(
  "menus/fetchMenuTreeById",
  async (id: string) => {
    const response = await axios.get(`/api/menus/tree/${id}`);
    return response.data;
  }
);

export const addMenu = createAsyncThunk(
  "menu/addMenu",
  async (menuData: { name: string; parentId: string | null }) => {
    const response = await axios.post(`/api/menus`, menuData);
    return response.data;
  }
);

export const updateMenu = createAsyncThunk(
  "menu/updateMenu",
  async ({ id, name }: { id: string; name: string }) => {
    const response = await axios.put(`/api/menus/${id}`, { name });
    return response.data;
  }
);

export const deleteMenu = createAsyncThunk(
  "menu/deleteMenu",
  async (id: string) => {
    const response = await axios.delete(`/api/menus/${id}`);
    return response.data;
  }
);

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
    builder
      .addCase(fetchMenuTreeById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMenuTreeById.fulfilled, (state, action) => {
        state.menuTree = action.payload;
        state.loading = false;
      })
      .addCase(fetchMenuTreeById.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default menuSlice.reducer;
