import { supabase } from "../supabase";

export const getWishlistedProducts = async (
  userId: string | undefined,
): Promise<WishlistItem[]> => {
  if (!userId) {
    throw new Error("User ID is required to fetch wishlisted products.");
  }

  const { data, error } = await supabase
    .from("wishlist")
    .select(
      `
      id,
      user_id,
      product:product_id (
        id,
        name,
        description,
        created_at,
        price,
        category,
        image_url
      )
    `,
    )
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  // Transform the response if needed (optional)
  return (data as WishlistItem[]) || [];
};

export type WishlistItem = {
  id: number;
  user_id: string | null;
  product: {
    id: number;
    name: string | null;
    description: string | null;
    created_at: string;
    price: number | null;
    category: string | null;
    image_url: string[] | null;
  };
};

export const mapWishlistItemData = (datalist: WishlistItem[]) => {
  return datalist.map((data) => ({
    id: data.id,
    user_id: data.user_id || "",
    product: {
      id: data.product.id,
      name: data.product.name || "",
      description: data.product.description || "",
      created_at: data.product.created_at || "",
      price: data.product.price || 0,
      category: data.product.category || "",
      image_url: data.product.image_url || [""],
    },
  }));
};

export const addToWishlist = async ({
  userId,
  productId,
}: {
  userId: string | undefined;
  productId: string | undefined;
}): Promise<void> => {
  if (!userId || !productId) {
    throw new Error(
      "User ID and Product ID are required to add to the wishlist.",
    );
  }

  const { error } = await supabase
    .from("wishlist")
    .insert([{ user_id: userId, product_id: Number(productId) }]);

  if (error) {
    throw new Error(error.message);
  }
};

export const deleteFromWishlist = async ({
  userId,
  productId,
}: {
  userId: string | undefined;
  productId: number | undefined;
}): Promise<void> => {
  if (!userId || !productId) {
    throw new Error(
      "User ID and Product ID are required to delete from the wishlist.",
    );
  }

  const { error } = await supabase
    .from("wishlist")
    .delete()
    .eq("user_id", userId)
    .eq("product_id", Number(productId));

  if (error) {
    throw new Error(error.message);
  }
};
