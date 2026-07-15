import { AuthContext } from "./auth.context";
import { useState, useEffect } from "react";
import { getMe } from "../features/auth/services/auth.api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getMe();
        console.log(data);
        setUser(data.userData);
      } catch (err) {
        setUser(null);
        throw err;
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
