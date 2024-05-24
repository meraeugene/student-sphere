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

export const deleteProgram = createAsyncThunk(
  "programs/deleteProgram",
  async (programName, { dispatch }) => {
    try {
      const formData = new FormData();
      formData.append("programName", programName);
      const response = await axios.post(
        "http://localhost/student-sphere/server/Programs/deleteProgram.php",
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

export const registerProgram = createAsyncThunk(
  "programs/registerProgram",
  async (programData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      Object.entries(programData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.post(
        "http://localhost/student-sphere/server/Programs/registerProgram.php",
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
        "http://localhost/student-sphere/server/Programs/editProgram.php",
        formData
      );
      console.log(response);
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
        state.status = "succeeded";
        state.programs = action.payload;
      })
      .addCase(fetchPrograms.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteProgram.fulfilled, (state, action) => {
        state.programs = state.programs.filter(
          (program) => program.program_name !== action.meta.arg
        );
      })
      .addCase(registerProgram.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerProgram.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.programs.push(action.payload);
      })
      .addCase(registerProgram.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateProgram.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProgram.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedProgram = action.payload;
        state.programs = state.programs.map((program) =>
          program.program_name === updatedProgram.program_name
            ? updatedProgram
            : program
        );
      })
      .addCase(updateProgram.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
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