import { useContext } from "react";
import { AuthContext } from "../../../contexts/auth.context";
import { login, logout, register } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login({ email, password });
      setUser(data.user);
    } catch (error) {
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await register({ username, email, password });
      setUser(data.user);
    } catch (error) {
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } catch (error) {
      // even if the API call fails, clear local user state
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, handleLogin, handleLogout, handleRegister };
};
