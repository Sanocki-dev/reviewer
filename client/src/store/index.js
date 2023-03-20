import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  user: null,
  token: null,
  movies: [],
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
    // Sets the movies currently being displayed
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
  },
});

export const { setMode, setLogin, setLogout, setFollowers, setMovies } =
  authSlice.actions;
export default authSlice.reducer;
