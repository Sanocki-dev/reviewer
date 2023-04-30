import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  user: null,
  token: null,
  isSidebarOpen: false,
  area: "CA"
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Toggle between themes
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    // Log the user in
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    // Log the user out
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    //
    setFollowers: (state, action) => {
      // Checks if the user is logged in
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.log("User friends non-existent :");
      }
    },
    // Toggles the sidebar
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export const { setMode, setLogin, setLogout, setFollowers, toggleSidebar } =
  authSlice.actions;
export default authSlice.reducer;
