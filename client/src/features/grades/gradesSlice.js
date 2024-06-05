import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  grades: [],
  status: "idle",
  error: null,
};

export const fetchGrades = createAsyncThunk(
  "grades/fetchGrades",
  async ({ facultyId }) => {
    const response = await axios.get(
      `http://localhost/student-sphere/server/Grades/grades.php?facultyId=${facultyId}`
    );
    return response.data;
  }
);

export const addGrades = createAsyncThunk(
  "grades/addGrades",
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.post(
        "http://localhost/student-sphere/server/Grades/addGrades.php",
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

const gradessSlice = createSlice({
  name: "grades",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGrades.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGrades.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.grades = action.payload;
      })
      .addCase(fetchGrades.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addGrades.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addGrades.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addGrades.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default gradessSlice.reducer;
