import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosInstance } from "axios";

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const api: AxiosInstance = axios.create({
  baseURL: NEXT_PUBLIC_API_BASE_URL
    ? NEXT_PUBLIC_API_BASE_URL
    : `${BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.defaults.baseURL =
  NEXT_PUBLIC_API_BASE_URL || "https://hyperhireapi.onrender.com";

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
  const response = await api.get(`menus`);
  return response.data;
});

export const fetchMenuById = createAsyncThunk(
  "menu/fetchMenuById",
  async (id: string) => {
    const response = await api.get(`menus/${id}`);
    return response.data;
  }
);

export const fetchMenuTreeById = createAsyncThunk(
  "menus/fetchMenuTreeById",
  async (id: string) => {
    const response = await api.get(`menus/tree/${id}`);
    return response.data;
  }
);

export const addMenu = createAsyncThunk(
  "menu/addMenu",
  async (menuData: { name: string; parentId: string | null }) => {
    const response = await api.post(`menus`, menuData);
    return response.data;
  }
);

export const updateMenu = createAsyncThunk(
  "menu/updateMenu",
  async ({ id, name }: { id: string; name: string }) => {
    const response = await api.put(`menus/${id}`, { name });
    return response.data;
  }
);

export const deleteMenu = createAsyncThunk(
  "menu/deleteMenu",
  async (id: string) => {
    const response = await api.delete(`menus/${id}`);
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
