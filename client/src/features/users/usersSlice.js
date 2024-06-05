import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  status: "idle",
  error: null,
};

export const registerAdmin = createAsyncThunk(
  "users/registerAdmin",
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.post(
        "http://localhost/student-sphere/server/Admins/add_admin.php",
        formData
      );
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "users/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.post(
        "http://localhost/student-sphere/server/Users/reset_password.php",
        formData
      );
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
      return rejectWithValue(error.response.data);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export default usersSlice.reducer;
