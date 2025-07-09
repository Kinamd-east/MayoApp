import { usePrivy } from "@privy-io/react-auth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { authenticated, ready } = usePrivy();

  if (!ready) return <div>Loading...</div>;

  return authenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
