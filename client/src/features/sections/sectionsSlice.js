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

export const registerSection = createAsyncThunk(
  "sections/registerSection",
  async (sectionData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      Object.entries(sectionData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.post(
        "http://localhost/student-sphere/server/Sections/add_section.php",
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
        "http://localhost/student-sphere/server/Sections/update_section.php",
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

export const deleteSection = createAsyncThunk(
  "sections/deleteSection",
  async (sectionId, { dispatch }) => {
    try {
      const formData = new FormData();
      formData.append("sectionId", sectionId);
      const response = await axios.post(
        "http://localhost/student-sphere/server/Sections/delete_section.php",
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
      });
  },
});

export default sectionsSlice.reducer;
