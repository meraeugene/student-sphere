import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  departments: [],
  departmentNames: [],
  status: "idle",
  error: null,
};

export const addDepartment = createAsyncThunk(
  "departments/addDepartment",
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.post(
        "http://localhost/student-sphere/server/Departments/add_department.php",
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

export const fetchDepartments = createAsyncThunk(
  "departments/fetchDepartments",
  async () => {
    const response = await axios.get(
      "http://localhost/student-sphere/server/Departments/departments.php"
    );
    return response.data;
  }
);

export const fetchDepartmentNames = createAsyncThunk(
  "courses/fetchDepartmentNames",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost/student-sphere/server/Departments/departments.php"
      );

      // Ensure response.data exists before mapping
      if (!response.data) {
        throw new Error("No data found");
      }

      // Map and return the transformed data
      return response.data.map((department) => ({
        department_name: department.department_name,
        department_id: department.department_id,
      }));
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const departmentsSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.departments = action.payload;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchDepartmentNames.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDepartmentNames.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.departmentNames = action.payload;
      })
      .addCase(fetchDepartmentNames.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default departmentsSlice.reducer;
