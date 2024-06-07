import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
    },
    updateProfilePicture: (state, action) => {
      state.userInfo = {
        ...state.userInfo,
        profile_picture: action.payload,
      };
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, updateProfilePicture, logout } =
  authSlice.actions;

export default authSlice.reducer;
