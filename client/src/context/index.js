import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
const cookies = new Cookies(null, { path: "/" });

const initialState = {
  mode: "dark",
  user: null,
  token: null,
  isAuth: false,
  isSidebarOpen: false,
  area: "CA",
  movie: {},
  isAuthenticating: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Toggle between themes
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    // Save movie that was clicked
    setMovie: (state, action) => {
      state.movie = action.payload;
    },
    // Log the user in
    setLogin: (state, action) => {
      console.log(action)
      console.log(cookies.get("token"))
      
      state.user = action.payload;
      state.token = cookies.get("token");
      state.isAuth = true;
      state.isAuthenticating = false;
    },
    // Log the user out
    triggerLogout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuth = false;
      cookies.remove("token");
      cookies.remove("user");
    },
    updateUser: (state, action) => {
      state.user[action.payload.type] = action.payload.data
    },
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
    toggleIsAuthenticating: (state) => {
      state.isAuthenticating = !state.isAuthenticating;
    },
  },
});

export const {
  setMode,
  setLogin,
  triggerLogout,
  setFollowers,
  toggleSidebar,
  toggleIsAuthenticating,
  updateUser,
  setMovie,
} = authSlice.actions;
export default authSlice.reducer;
