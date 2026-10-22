import { useContext, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { UserToken } = useContext(AuthContext);
  return UserToken ? children : <Navigate to="/login" replace />;
}
