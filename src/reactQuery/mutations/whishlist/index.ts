import { addToWishlist, deleteFromWishlist } from "@/supabase/whishlist";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void, // Updated to reflect the `void` return type of `mutationFn`
    Error,
    { userId: string | undefined; productId: string | undefined }
  >({
    mutationKey: ["addToWishlist"],
    mutationFn: addToWishlist,

    // Updated to use the void-returning function
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({
        queryKey: ["Wishlist", userId],
        exact: true,
      });
    },
    onError: () => {},
  });
};

export const useDeleteWishlistItem = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    {
      userId: string;
      productId: number;
    }
  >({
    mutationKey: ["deleteWishlistItem"],
    mutationFn: deleteFromWishlist,

    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({
        queryKey: ["Wishlist", userId],
        exact: true,
      });
    },

    onError: () => {},
  });
};
