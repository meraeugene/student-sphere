import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const StudentRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo && userInfo.role === "student" ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default StudentRoute;
