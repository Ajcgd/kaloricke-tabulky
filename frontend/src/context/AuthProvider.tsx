import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }:any) => {
  window.addEventListener('storage', () => {
    const initialValue = localStorage.getItem("auth")
      //@ts-ignore
      ? JSON.parse(window.localStorage.getItem("auth"))
      : {};
    setAuth(initialValue);
  })

  //@ts-ignore
  const initialValue = localStorage.getItem("auth") ? JSON.parse(window.localStorage.getItem("auth")) : {}

  const [auth, setAuth] = useState(initialValue);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;