import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    checkUserStatus();
  }, []);

  const registerUser = async (userData) => {
    try {
      const response = await fetch("/public/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log(data.Message);
    } catch (error) {
      console.error("Register user error:", error);
    }
  };

  const loginUser = async (credentials) => {
    try {
      const response = await fetch("/public/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      localStorage.setItem("token", data.token);
      await checkUserStatus();
      console.log(data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login user error:", error);
    }
  };

  const logoutUser = async () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const checkUserStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await fetch("/protected/validate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();
      setUser(data.user);
      console.log(data.user);
    } catch (error) {
      console.error("Check user status error:", error);
      setUser(null);
    }
  };

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
