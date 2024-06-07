import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchFaculties = createAsyncThunk(
  "faculties/fetchFaculties",
  async () => {
    const response = await axios.get(
      "http://localhost/student-sphere/server/Faculties/faculties.php"
    );
    return response.data;
  }
);

export const registerFaculty = createAsyncThunk(
  "faculties/registerFaculty",
  async (facultyData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      Object.entries(facultyData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.post(
        "http://localhost/student-sphere/server/Users/register.php",
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

export const updateFaculty = createAsyncThunk(
  "faculties/updateFaculty",
  async (facultyData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      Object.entries(facultyData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.post(
        "http://localhost/student-sphere/server/Faculties/update_faculty.php",
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

export const deleteFaculty = createAsyncThunk(
  "faculties/deleteFaculty",
  async (facultyId, { dispatch }) => {
    try {
      const formData = new FormData();
      formData.append("facultyId", facultyId);
      const response = await axios.post(
        "http://localhost/student-sphere/server/Faculties/delete_faculty.php",
        formData
      );
      dispatch(fetchFaculties());
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const assignSubjectsToFaculty = createAsyncThunk(
  "faculties/assignSubjectsToFaculty",
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.post(
        "http://localhost/student-sphere/server/FacultySubjects/assign_subjects.php",
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

export const removeSubjects = createAsyncThunk(
  "faculties/removeSubjects",
  async (facultyId, { dispatch }) => {
    try {
      const formData = new FormData();
      formData.append("facultyId", facultyId);
      const response = await axios.post(
        "http://localhost/student-sphere/server/Faculties/remove_faculty_subjects.php",
        formData
      );
      dispatch(fetchFaculties());
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
      return rejectWithValue(error.response.data);
    }
  }
);

const facultiesSlice = createSlice({
  name: "faculties",
  initialState: {
    faculties: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaculties.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFaculties.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.faculties = action.payload;
      })
      .addCase(fetchFaculties.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default facultiesSlice.reducer;
