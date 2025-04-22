import { Navigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import AdminOrders from "../pages/AdminOrders";
import OrderDetails from "../pages/OrderDetails";

const RoleBasedRoute = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return user.role === "admin" ? <AdminOrders /> : <OrderDetails />;
};

export default RoleBasedRoute;
