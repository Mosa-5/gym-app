import { Loader } from "@/pageComponents/loader/loader";
import { useAuthContext } from "../../../context/auth/hooks/useAuthContext";
import { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthGuardLogIn: React.FC<PropsWithChildren> = ({ children }) => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <Loader />;
  }

  if (user) {
    return <Navigate to="/dashboard/profilePage" replace />;
  }

  return children || <Outlet />;
};

export default AuthGuardLogIn;
