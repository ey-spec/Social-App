import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";


export function ProtectedRoute({ children }) {
  const { UserToken } = useContext(AuthContext);
  return UserToken ? children : <Navigate to="/login" replace />;
}
