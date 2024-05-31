import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./features/authentication/authSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import usersReducer from "./features/users/usersSlice";
import departmentsReducer from "./features/departments/departmentsSlice";
import facultiesReducer from "./features/faculties/facultiesSlice";
import studentsReducer from "./features/students/studentsSlice";
import programsReducer from "./features/programs/programsSlice";
import subjectsReducer from "./features/subjects/subjectsSlice";
import sectionsReducer from "./features/sections/sectionsSlice";

const rootReducer = combineReducers({
  auth: authSliceReducer,
  users: usersReducer,
  departments: departmentsReducer,
  faculties: facultiesReducer,
  students: studentsReducer,
  programs: programsReducer,
  subjects: subjectsReducer,
  sections: sectionsReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export const persistor = persistStore(store);
