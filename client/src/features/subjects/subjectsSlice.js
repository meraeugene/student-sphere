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

export const deleteSubject = createAsyncThunk(
  "subjects/deleteSubject",
  async (subjectCode, { dispatch }) => {
    try {
      const formData = new FormData();
      formData.append("subjectCode", subjectCode);
      const response = await axios.post(
        "http://localhost/student-sphere/server/Subjects/deleteSubject.php",
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

export const registerSubject = createAsyncThunk(
  "subjects/registerSubject",
  async (subjectData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      Object.entries(subjectData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.post(
        "http://localhost/student-sphere/server/Subjects/registerSubject.php",
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
        "http://localhost/student-sphere/server/Subjects/editSubject.php",
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

const subjectsSlice = createSlice({
  name: "subjects",
  initialState: {
    subjects: [],
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
      .addCase(deleteSubject.fulfilled, (state, action) => {
        state.subjects = state.subjects.filter(
          (subject) => subject.subject_code !== action.meta.arg
        );
      })
      .addCase(registerSubject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerSubject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subjects.push(action.payload);
      })
      .addCase(registerSubject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateSubject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateSubject.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedSubject = action.payload;
        state.subjects = state.subjects.map((subject) =>
          subject.subject_code === updatedSubject.subject_code
            ? updateSubject
            : subject
        );
      })
      .addCase(updateSubject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default subjectsSlice.reducer;
