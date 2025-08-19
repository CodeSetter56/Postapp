import { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext({
  user: null,
  loading: true,
  signup: async () => {},
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  //to remove flicker caused during fetching the user details
  const [loading, setLoading] = useState(true);

  const url = "https://postapp-backend-3nea.onrender.com";
  // const url: "http://localhost:9001",

  //for persistant user data
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch(`${url}/api/user/me`, {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
        console.error("failed to fetch user", error);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, [url]);

  //checking the user on every reload
  useEffect(() => {
    console.log(user);
  }, [user]);

  const signup = async (userData) => {
    const res = await fetch(`${url}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (res.ok) {
      setUser(data);
      return data;
    } else {
      throw new Error(data.message);
    }
  };

  const login = async (userData) => {
    const res = await fetch(`${url}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (res.ok) {
      setUser(data);
      return data;
    } else {
      throw new Error(data.message);
    }
  };

  const logout = async () => {
    const res = await fetch(`${url}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok) {
      setUser(null);
      return data;
    } else {
      throw new Error(data.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
