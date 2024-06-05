import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchSubjects = createAsyncThunk(
  "subjects/fetchSubjects",
  async () => {
    const response = await axios.get(
      "http://localhost/student-sphere/server/Subjects/subjects.php"
    );
    return response.data;
  }
);

export const fetchStudentSubjectsEnrolled = createAsyncThunk(
  "grades/fetchStudentSubjectsEnrolled",
  async ({ studentId }) => {
    const response = await axios.get(
      `http://localhost/student-sphere/server/Subjects/student_subjects_enrolled.php?studentId=${studentId}`
    );
    return response.data;
  }
);

export const registerSubject = createAsyncThunk(
  "subjects/registerSubject",
  async (subjectData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      Object.entries(subjectData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.post(
        "http://localhost/student-sphere/server/Subjects/add_subject.php",
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

export const updateSubject = createAsyncThunk(
  "subjects/updateSubject",
  async (subjectData, { rejectWithValue }) => {
    try {
      console.log(subjectData);
      const formData = new FormData();

      Object.entries(subjectData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.post(
        "http://localhost/student-sphere/server/Subjects/update_subject.php",
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

export const deleteSubject = createAsyncThunk(
  "subjects/deleteSubject",
  async (subjectCode, { dispatch }) => {
    try {
      const formData = new FormData();
      formData.append("subjectCode", subjectCode);
      const response = await axios.post(
        "http://localhost/student-sphere/server/Subjects/delete_subject.php",
        formData
      );
      dispatch(fetchSubjects());
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
      return rejectWithValue(error.response.data);
    }
  }
);

const subjectsSlice = createSlice({
  name: "subjects",
  initialState: {
    subjects: [],
    studentSubjectsEnrolled: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subjects = action.payload;
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchStudentSubjectsEnrolled.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudentSubjectsEnrolled.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.studentSubjectsEnrolled = action.payload;
      })
      .addCase(fetchStudentSubjectsEnrolled.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default subjectsSlice.reducer;
