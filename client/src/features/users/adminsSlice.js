import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  adminUsers: [],
  status: "idle",
  error: null,
};

export const fetchAdmins = createAsyncThunk("admins/fetchAdmins", async () => {
  const response = await axios.get(
    "http://localhost/student-sphere/server/Admins/admins.php"
  );
  return response.data;
});

const usersSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmins.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.adminUsers = action.payload;
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
