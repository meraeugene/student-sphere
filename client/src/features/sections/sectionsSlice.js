import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchSections = createAsyncThunk(
  "sections/fetchSections",
  async () => {
    const response = await axios.get(
      "http://localhost/student-sphere/server/Sections/sections.php"
    );
    return response.data;
  }
);

export const deleteSection = createAsyncThunk(
  "sections/deleteSection",
  async (sectionId, { dispatch }) => {
    try {
      const formData = new FormData();
      formData.append("sectionId", sectionId);
      const response = await axios.post(
        "http://localhost/student-sphere/server/Sections/deleteSection.php",
        formData
      );
      dispatch(fetchSections());
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerSection = createAsyncThunk(
  "sections/registerSection",
  async (sectionData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      Object.entries(sectionData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.post(
        "http://localhost/student-sphere/server/Sections/registerSection.php",
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

export const updateSection = createAsyncThunk(
  "sections/updateSection",
  async (sectionData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      Object.entries(sectionData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.post(
        "http://localhost/student-sphere/server/Sections/editSection.php",
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

const sectionsSlice = createSlice({
  name: "sections",
  initialState: {
    sections: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSections.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSections.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sections = action.payload;
      })
      .addCase(fetchSections.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteSection.fulfilled, (state, action) => {
        state.sections = state.sections.filter(
          (section) => section.section_id !== action.meta.arg
        );
      })
      .addCase(registerSection.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerSection.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sections.push(action.payload);
      })
      .addCase(registerSection.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateSection.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateSection.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedSection = action.payload;
        state.sections = state.sections.map((section) =>
          section.section_id === updatedSection.section_id
            ? updatedSection
            : section
        );
      })
      .addCase(updateSection.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default sectionsSlice.reducer;
