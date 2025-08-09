import { createSlice } from "@reduxjs/toolkit";

type SidebarState = {
  isOpen: boolean;
};

const initialState: SidebarState = {
  isOpen: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
    },
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { close, open, toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
