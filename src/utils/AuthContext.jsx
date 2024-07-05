import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const registerUser = async () => {};

  const loginUser = async () => {};

  const logoutUser = async () => {};

  const checkUserStatus = async () => {};

  return (
    <AuthContext.Provider
      value={{ user, registerUser, loginUser, logoutUser, checkUserStatus }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
