import { Outlet } from "react-router";
import LogoutButton from "./LogoutButton";
import "./app-layout.scss";

const AppLayout = () => {
  return (
    <div className="app-layout">
      <header className="app-header">
        <LogoutButton />
      </header>
      <Outlet />
    </div>
  );
};

export default AppLayout;
