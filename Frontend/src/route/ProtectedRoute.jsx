import { Navigate, Outlet } from "react-router";
import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

const ProtectedRoute = ({ requiredRole }) => {
  const { user } = useContext(UserContext);

  if (!user || user.role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; 
};

export default ProtectedRoute;
