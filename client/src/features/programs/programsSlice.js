import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchPrograms = createAsyncThunk(
  "programs/fetchPrograms",
  async () => {
    const response = await axios.get(
      "http://localhost/student-sphere/server/Programs/programs.php"
    );
    return response.data;
  }
);

export const addProgram = createAsyncThunk(
  "programs/addProgram",
  async (programData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      Object.entries(programData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.post(
        "http://localhost/student-sphere/server/Programs/add_program.php",
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

export const updateProgram = createAsyncThunk(
  "programs/updateProgram",
  async (programData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      Object.entries(programData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.post(
        "http://localhost/student-sphere/server/Programs/update_program.php",
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

export const deleteProgram = createAsyncThunk(
  "programs/deleteProgram",
  async (programName, { dispatch }) => {
    try {
      const formData = new FormData();
      formData.append("programName", programName);
      const response = await axios.post(
        "http://localhost/student-sphere/server/Programs/delete_program.php",
        formData
      );
      dispatch(fetchPrograms());
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProgramNames = createAsyncThunk(
  "programs/fetchProgramNames",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost/student-sphere/server/Programs/programs.php"
      );
      return response.data.map((program) => program.program_name);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const programsSlice = createSlice({
  name: "programs",
  initialState: {
    programs: [],
    programNames: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrograms.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPrograms.fulfilled, (state, action) => {
        state.status = "loading";
        state.programs = action.payload;
      })
      .addCase(fetchPrograms.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProgramNames.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProgramNames.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.programNames = action.payload;
      })
      .addCase(fetchProgramNames.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default programsSlice.reducer;
