import { LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const LogoutButton = () => {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await handleLogout();
    } finally {
      navigate("/login");
    }
  };

  return (
    <button onClick={onLogout} className="logout-btn">
      <LogOut size={16} />
      Logout
    </button>
  );
};

export default LogoutButton;
