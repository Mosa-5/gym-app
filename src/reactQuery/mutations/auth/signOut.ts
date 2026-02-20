import { logout } from "@/supabase/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useSignOut = () => {
  const navigate = useNavigate();

  return useMutation<void, Error, void>({
    mutationKey: ["logout"],
    mutationFn: logout,

    onSuccess: () => {
      navigate("/auth/signin");
    },

    onError: () => {},
  });
};
