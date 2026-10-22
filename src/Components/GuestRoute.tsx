import { useContext, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";


export function GuestRoute({ children }: { children: ReactNode }) {
  const { UserToken } = useContext(AuthContext);
  return UserToken ? <Navigate to="/" replace /> : children;
}
