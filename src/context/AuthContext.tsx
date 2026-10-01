import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [UserToken, setUserToken] = useState(() =>
    localStorage.getItem("UserToken"),
  );

  return (
    <AuthContext.Provider value={{ UserToken, setUserToken }}>
      {children}
    </AuthContext.Provider>
  );
}
