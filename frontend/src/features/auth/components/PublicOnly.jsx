import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";

const PublicOnly = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  if (user) {
    return <Navigate to={"/"} />;
  }

  return children;
};

export default PublicOnly;
