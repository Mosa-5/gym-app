import {
  getTopReviews,
  getReviewStats,
  ReviewStats,
} from "@/supabase/reviews/topReviews";
import { ProductReviews } from "@/supabase/reviews";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetTopReviews = (): UseQueryResult<
  ProductReviews[],
  Error
> => {
  return useQuery<ProductReviews[], Error>({
    queryKey: ["topReviews"],
    queryFn: getTopReviews,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetReviewStats = (): UseQueryResult<ReviewStats, Error> => {
  return useQuery<ReviewStats, Error>({
    queryKey: ["reviewStats"],
    queryFn: getReviewStats,
    staleTime: 5 * 60 * 1000,
  });
};
