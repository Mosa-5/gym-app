import { Loader } from "@/pageComponents/loader/loader";
import { useAuthContext } from "../../../context/auth/hooks/useAuthContext";
import { PropsWithChildren } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthGuardLogOut: React.FC<PropsWithChildren> = ({ children }) => {
  const { user, loading } = useAuthContext();
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    // Remember where the user was headed so sign-in can send them back there.
    return <Navigate to="/auth/signIn" state={{ from: location }} replace />;
  }

  return children || <Outlet />;
};

export default AuthGuardLogOut;
