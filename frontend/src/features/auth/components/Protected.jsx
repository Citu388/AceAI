import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import "./app-layout.scss";

const Protected = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <main className="loading-screen">
        <div className="loader"></div>
      </main>
    );
  }

  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default Protected;
