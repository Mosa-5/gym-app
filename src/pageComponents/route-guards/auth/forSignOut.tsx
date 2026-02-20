import { Loader } from "@/pageComponents/loader/loader";
import { useAuthContext } from "../../../context/auth/hooks/useAuthContext";
import { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthGuardLogOut: React.FC<PropsWithChildren> = ({ children }) => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/dashboard/main" replace />;
  }

  return children || <Outlet />;
};

export default AuthGuardLogOut;
