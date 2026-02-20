import { deleteReview, toggleLike, writeReview } from "@/supabase/reviews";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useWriteReview = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    {
      userId: string;
      rating: number;
      productId: string;
      comment: string;
    }
  >({
    mutationKey: ["writeReview"],
    mutationFn: writeReview,

    onSuccess: (_, { userId, productId }) => {
      queryClient.invalidateQueries({
        queryKey: ["userReviews", userId],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["productReviews", productId],
        exact: true,
      });
    },

    onError: () => {},
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    {
      userId: string;
      reviewId: number;
      productId: string;
    }
  >({
    mutationKey: ["deleteReview"],
    mutationFn: async ({ reviewId }) => deleteReview(reviewId),

    onSuccess: (_, { userId, productId }) => {
      queryClient.invalidateQueries({
        queryKey: ["userReviews", userId],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["productReviews", productId],
        exact: true,
      });
    },

    onError: () => {},
  });
};

export const useToggleLike = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { liked: boolean; change: number },
    Error,
    { reviewId: number; userId: string; productId: string }
  >({
    mutationKey: ["toggleLike"],
    mutationFn: ({ reviewId, userId }) => toggleLike(reviewId, userId),

    onSuccess: (_, { productId, userId, reviewId }) => {
      queryClient.invalidateQueries({
        queryKey: ["userReviews", userId],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["productReviews", productId],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["liked", userId, reviewId],
        exact: true,
      });
    },

    onError: () => {
      toast("Must be logged in");
    },
  });
};
