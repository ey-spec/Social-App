import { createContext, useState, type ReactNode } from "react";

interface AuthContextType {
  UserToken: string | null;
  setUserToken: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [UserToken, setUserToken] = useState<string | null>(() =>
    localStorage.getItem("UserToken"),
  );

  return (
    <AuthContext.Provider value={{ UserToken, setUserToken }}>
      {children}
    </AuthContext.Provider>
  );
}
