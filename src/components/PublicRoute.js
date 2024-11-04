// src/components/PublicRoute.js
import { Navigate } from "react-router-dom";

const PublicRoute = ({ element, isLoggedIn }) => {
  return isLoggedIn ? <Navigate to="/" replace /> : element;
};

export default PublicRoute;
