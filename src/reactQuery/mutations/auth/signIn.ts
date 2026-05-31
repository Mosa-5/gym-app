import { GuestSignIn, login } from "@/supabase/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useSignIn = (redirectTo = "/dashboard/main") => {
  const navigate = useNavigate();

  return useMutation<void, Error, { email: string; password: string }>({
    mutationKey: ["login"],
    mutationFn: login,

    onSuccess: () => {
      navigate(redirectTo, { replace: true });
    },
    onError: () => {},
  });
};

export const useGuestSignIn = (redirectTo = "/dashboard/main") => {
  const navigate = useNavigate();

  return useMutation<void, Error>({
    mutationKey: ["guestLogin"],
    mutationFn: GuestSignIn,

    onSuccess: () => {
      navigate(redirectTo, { replace: true });
    },
  });
};
