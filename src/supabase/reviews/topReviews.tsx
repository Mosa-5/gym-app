import { supabase } from "../supabase";
import { ProductReviews } from ".";

export type ReviewStats = {
  totalCount: number;
  averageRating: number;
};

export const getTopReviews = async (): Promise<ProductReviews[]> => {
  const { data, error } = await supabase
    .from("reviews")
    .select(
      `
      *,
      profiles!reviews_user_id_fkey ( avatar_url, username )
    `,
    )
    .order("like_count", { ascending: false })
    .limit(12);

  if (error) {
    throw new Error(error.message);
  }

  return (data as ProductReviews[]) || [];
};

export const getReviewStats = async (): Promise<ReviewStats> => {
  const { data, error, count } = await supabase
    .from("reviews")
    .select("rating", { count: "exact" });

  if (error) {
    throw new Error(error.message);
  }

  const totalCount = count || 0;
  const averageRating =
    totalCount > 0
      ? data.reduce(
          (sum: number, r: { rating: number | null }) =>
            sum + Number(r.rating || 0),
          0,
        ) / totalCount
      : 0;

  return { totalCount, averageRating: Math.round(averageRating * 10) / 10 };
};
