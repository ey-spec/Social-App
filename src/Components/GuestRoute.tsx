import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";


export function GuestRoute({ children }) {
  const { UserToken } = useContext(AuthContext);
  return UserToken ? <Navigate to="/" replace /> : children;
}
