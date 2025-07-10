import NavigationBar from "../NavigationBar.tsx";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <NavigationBar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
