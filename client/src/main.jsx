import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Login from "./pages/Login.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "./stores.js";
import { PersistGate } from "redux-persist/integration/react";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import Users from "./pages/Admin/Users.jsx";
import Courses from "./pages/Admin/Courses.jsx";
import Departments from "./pages/Admin/Departments.jsx";
import Faculties from "./pages/Admin/Faculties.jsx";
import Students from "./pages/Admin/Students.jsx";
import Subjects from "./pages/Admin/Subjects.jsx";
import Grades from "./pages/Admin/Grades.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/*" element={<ErrorPage />} />
      <Route index={true} path="/" element={<Login />} />

      <Route element={<PrivateRoute />}>
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route exact path="/admin/users" element={<Users />} />
        <Route exact path="/admin/courses" element={<Courses />} />
        <Route exact path="/admin/departments" element={<Departments />} />
        <Route exact path="/admin/faculties" element={<Faculties />} />
        <Route exact path="/admin/students" element={<Students />} />
        <Route exact path="/admin/subjects" element={<Subjects />} />
        <Route exact path="/admin/grades" element={<Grades />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
