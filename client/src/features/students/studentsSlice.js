import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await axios.get(
      "http://localhost/student-sphere/server/Students/students.php"
    );
    return response.data;
  }
);

export const registerStudent = createAsyncThunk(
  "students/registerStudent",
  async (studentData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      Object.entries(studentData).forEach(([key, value]) => {
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

export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async (studentData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      Object.entries(studentData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.post(
        "http://localhost/student-sphere/server/Students/update_student.php",
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

export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (studentId, { dispatch }) => {
    try {
      const formData = new FormData();
      formData.append("studentId", studentId);
      const response = await axios.post(
        "http://localhost/student-sphere/server/Students/delete_student.php",
        formData
      );
      dispatch(fetchStudents());
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
      return rejectWithValue(error.response.data);
    }
  }
);

const studentsSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default studentsSlice.reducer;
