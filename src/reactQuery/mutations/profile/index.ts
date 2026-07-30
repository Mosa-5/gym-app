import { fillProfileInfo, uploadAvatar } from "../../../supabase/account";
import { FillProfileInfoPayload } from "../../../supabase/account/index.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notify } from "@/lib/notify";

export const useFillProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void, // Updated to reflect the `void` return type of `mutationFn`
    Error,
    { id: string; values: FillProfileInfoPayload }
  >({
    mutationKey: ["fillProfileInfo"],
    mutationFn: fillProfileInfo, // Updated to use the void-returning function
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: ["profile", id],
        exact: true,
      });
      notify.success("Profile updated successfully.");
    },
    onError: () => {
      notify.error("Failed to update profile. Please try again.");
    },
  });
};

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation<string, Error, { userId: string; file: File }>({
    mutationKey: ["uploadAvatar"],
    mutationFn: uploadAvatar,
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({
        queryKey: ["profile", userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
      notify.success("Avatar updated successfully.");
    },
    onError: () => {
      notify.error("Failed to upload avatar. Please try again.");
    },
  });
};
