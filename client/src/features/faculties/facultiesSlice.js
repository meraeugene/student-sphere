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
        "http://localhost/student-sphere/server/Faculties/registerFaculty.php",
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
        "http://localhost/student-sphere/server/Faculties/editFaculty.php",
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
        "http://localhost/student-sphere/server/Faculties/deleteFaculty.php",
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
        "http://localhost/student-sphere/server/FacultySubjects/assignSubjects.php",
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

export const removeSection = createAsyncThunk(
  "faculties/removeSection",
  async (facultyId, { dispatch }) => {
    try {
      const formData = new FormData();
      formData.append("facultyId", facultyId);
      const response = await axios.post(
        "http://localhost/student-sphere/server/Faculties/removeSection.php",
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
      })
      .addCase(deleteFaculty.fulfilled, (state, action) => {
        state.faculties = state.faculties.filter(
          (faculty) => faculty.faculty_id !== action.meta.arg
        );
      })
      .addCase(registerFaculty.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerFaculty.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.faculties.push(action.payload);
      })
      .addCase(registerFaculty.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateFaculty.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateFaculty.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedFaculty = action.payload;
        state.faculties = state.faculties.map((faculty) =>
          faculty.username === updateFaculty.username ? updatedFaculty : faculty
        );
      })
      .addCase(updateFaculty.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(assignSubjectsToFaculty.pending, (state) => {
        state.status = "loading";
      })
      .addCase(assignSubjectsToFaculty.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(assignSubjectsToFaculty.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(removeSection.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeSection.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(removeSection.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default facultiesSlice.reducer;
