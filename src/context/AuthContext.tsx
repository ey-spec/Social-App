import { useMemo, useState, type ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./auth.context";

interface TokenPayload {
  user: string;
}

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [UserToken, setUserToken] = useState<string | null>(() =>
    localStorage.getItem("UserToken"),
  );

  const UserId = useMemo(() => {
    if (!UserToken) return null;
    try {
      return jwtDecode<TokenPayload>(UserToken).user;
    } catch {
      return null;
    }
  }, [UserToken]);

  return (
    <AuthContext.Provider value={{ UserToken, setUserToken, UserId }}>
      {children}
    </AuthContext.Provider>
  );
}
