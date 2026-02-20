import { supabase } from "../supabase";

export const getProductReviews = async (
  productId: string | undefined,
): Promise<ProductReviews[]> => {
  if (productId === undefined) {
    throw new Error("Product ID is required to fetch reviews.");
  }

  const { data, error } = await supabase
    .from("reviews")
    .select(
      `
      *,
      profiles!reviews_user_id_fkey ( avatar_url, username )
    `,
    )
    .eq("product_id", Number(productId))
    .order("like_count", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data as ProductReviews[]) || [];
};

export const writeReview = async ({
  userId,
  productId,
  rating,
  comment,
}: {
  userId: string;
  rating: number;
  productId: string;
  comment: string;
}): Promise<void> => {
  const { error } = await supabase.from("reviews").insert([
    {
      user_id: userId,
      product_id: Number(productId),
      rating: rating,
      comment: comment,
    },
  ]);

  if (error) {
    throw new Error("Failed to write the review. Please try again later.");
  }
};

export const deleteReview = async (reviewId: number): Promise<void> => {
  const { error } = await supabase.from("reviews").delete().eq("id", reviewId);

  if (error) {
    throw new Error("Failed to delete the review. Please try again later.");
  }
};

export const getUserReviews = async (
  id: string | undefined,
): Promise<Reviews[]> => {
  if (id === undefined) {
    throw new Error("User ID is required to fetch reviews.");
  }

  const { data, error } = await supabase
    .from("reviews")
    .select(
      `
      *,
      product!reviews_product_id_fkey ( image_url, name )
    `,
    )
    .order("created_at", { ascending: false })
    .eq("user_id", id);

  if (error) {
    throw new Error(error.message);
  }

  return (data as Reviews[]) || [];
};

export const toggleLike = async (reviewId: number, userId: string) => {
  if (!userId) throw new Error("User must be logged in.");
  // Check if the user already liked the review
  const { data: like, error: likeError } = await supabase
    .from("review_likes")
    .select("id")
    .eq("review_id", reviewId)
    .eq("user_id", userId)
    .maybeSingle();

  if (likeError && likeError.code !== "PGRST116")
    throw new Error(likeError.message);

  if (like) {
    // User has liked → Remove like & decrement `like_count`
    const { error: deleteError } = await supabase
      .from("review_likes")
      .delete()
      .eq("id", like.id);

    if (deleteError) throw new Error(deleteError.message);

    // Decrement like_count
    await supabase.rpc("decrement_like_count", { review_id: reviewId });

    return { liked: false, change: -1 };
  } else {
    // User has not liked → Add like & increment `like_count`
    const { error: insertError } = await supabase
      .from("review_likes")
      .insert([{ user_id: userId, review_id: reviewId }]);

    if (insertError) throw new Error(insertError.message);

    // Increment like_count
    await supabase.rpc("increment_like_count", { review_id: reviewId });

    return { liked: true, change: +1 };
  }
};

export const getLikedByUser = async (
  reviewId: number | undefined,
  userId: string | undefined,
): Promise<{ liked: boolean }> => {
  if (userId === undefined) {
    throw new Error("User ID is required to check like status.");
  }

  if (reviewId === undefined) {
    throw new Error("Review ID is required to check like status.");
  }

  const { data, error } = await supabase
    .from("review_likes")
    .select("id")
    .eq("review_id", reviewId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw new Error(error.message);

  if (data) {
    return { liked: true };
  }

  return { liked: false };
};

export const mapUserReviewsData = (datalist: Reviews[]) => {
  return datalist.map((data) => ({
    comment: data.comment || "",
    created_at: data.created_at || "",
    like_count: data.like_count ?? 0,
    product_id: data.product_id ?? 0,
    user_id: data.user_id || "",
    rating: data.rating ?? "0",
    product: {
      image_url: data.product.image_url || [""],
      name: data.product.name || "",
    },
    id: data.id,
  }));
};

export type Reviews = {
  comment: string | null;
  created_at: string;
  id: number;
  like_count: number | null;
  product_id: number | null;
  user_id: string | null;
  rating: string | null;
  product: {
    image_url: string[] | null;
    name: string | null;
  };
};

export type ProductReviews = {
  comment: string | null;
  created_at: string;
  id: number;
  like_count: number | null;
  product_id: number | null;
  user_id: string | null;
  rating: string | null;
  profiles: {
    avatar_url: string | null;
    username: string | null;
  };
};
