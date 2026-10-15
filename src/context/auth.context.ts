// src/context/auth.context.ts
import { createContext } from "react";

export interface AuthContextType {
  UserToken: string | null;
  setUserToken: (token: string | null) => void;
  UserId: string | null;
}

export const AuthContext = createContext<AuthContextType>({
  UserToken: null,
  setUserToken: () => {},
  UserId: null,
});