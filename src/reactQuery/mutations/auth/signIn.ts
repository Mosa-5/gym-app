import { GuestSignIn, login } from "@/supabase/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useSignIn = () => {
  const navigate = useNavigate();

  return useMutation<void, Error, { email: string; password: string }>({
    mutationKey: ["login"],
    mutationFn: login,

    onSuccess: () => {
      navigate("/dashboard/main");
    },
    onError: (error: Error) => {
      console.error("Login failed:", error);
      throw error;
    },
  });
};

export const useGuestSignIn = () => {
  const navigate = useNavigate();

  return useMutation<void, Error>({
    mutationKey: ["login"],
    mutationFn: GuestSignIn,

    onSuccess: () => {
      navigate("/dashboard/main");
    },
    onError: (error: Error) => {
      console.error("Login failed:", error);
      throw error;
    },
  });
};
