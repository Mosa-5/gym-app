import { supabase } from "../supabase";

export interface ProductFilters {
  search?: string;
  priceRange?: [number, number];
  categories?: string[];
  sortBy?: string;
  page?: number;
  pageSize?: number;
}

export type PaginatedProducts = {
  data: Product[];
  totalCount: number;
};

export const getFilteredProducts = async (
  filters: ProductFilters,
): Promise<PaginatedProducts> => {
  const page = filters.page ?? 1;
  const pageSize = filters.pageSize ?? 9;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("product")
    .select("*, reviews(rating)", { count: "exact" });

  if (filters.search) {
    query = query.ilike("name", `%${filters.search}%`);
  }

  if (filters.priceRange) {
    query = query
      .gte("price", filters.priceRange[0])
      .lte("price", filters.priceRange[1]);
  }

  if (filters.categories && filters.categories.length > 0) {
    query = query.in("category", filters.categories);
  }

  if (filters.sortBy) {
    switch (filters.sortBy) {
      case "price-asc":
        query = query.order("price", { ascending: true });
        break;
      case "price-desc":
        query = query.order("price", { ascending: false });
        break;
      case "name-asc":
        query = query.order("name", { ascending: true });
        break;
      case "name-desc":
        query = query.order("name", { ascending: false });
        break;
    }
  }

  const { data, error, count } = await query.range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  return { data: (data as Product[]) || [], totalCount: count ?? 0 };
};

export type Product = {
  category: string | null;
  created_at: string;
  description: string | null;
  id: number;
  image_url: string[] | null;
  name: string | null;
  price: number | null;
  sales_number: number | null;
  /** Colour options of one item share a `variant_group`; null means no options. */
  variant_group: string | null;
  color: string | null;
  reviews?: { rating: number | null }[];
};

export const mapProductTableData = (datalist: Product[]) => {
  return datalist.map((data) => {
    const reviews = data.reviews ?? [];
    const avgRating =
      reviews.length > 0
        ? Math.round(
            (reviews.reduce((sum, r) => sum + (r.rating ?? 0), 0) /
              reviews.length) *
              10,
          ) / 10
        : null;
    return {
      category: data.category || "",
      created_at: data.created_at || "",
      description: data.description || "",
      image_url: data.image_url || [],
      name: data.name || "",
      price: data.price ?? 0,
      id: data.id,
      variant_group: data.variant_group,
      color: data.color,
      avgRating,
    };
  });
};

export type MappedProduct = ReturnType<typeof mapProductTableData>[number];

export const getSingleProduct = async (id: string) => {
  const { data, error } = await supabase
    .from("product")
    .select("*") // Specify the fields to retrieve
    .eq("id", Number(id)) // Match the `id` column
    .single(); // Expect a single record

  if (error) {
    throw new Error(error.message);
  }

  return data as Product;
};

export const mapSingleProductTableData = (data: Product) => ({
  category: data.category || "",
  created_at: data.created_at || "",
  description: data.description || "",
  image_url: data.image_url || [],
  name: data.name || "",
  price: data.price ?? 0,
  id: data.id,
  variant_group: data.variant_group,
  color: data.color,
});

/**
 * The colour options of one item. Ordered by colour so the swatch row keeps a
 * stable order no matter how rows come back.
 */
export const getProductVariants = async (variantGroup: string) => {
  const { data, error } = await supabase
    .from("product")
    .select("id, name, price, color")
    .eq("variant_group", variantGroup)
    .order("color");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export type ProductVariantRow = Awaited<
  ReturnType<typeof getProductVariants>
>[number];

export const getProductListWithCategory = async (
  productType: string | undefined,
) => {
  const { data, error } = await supabase
    .from("product")
    .select("*, reviews(rating)")
    .ilike("category", productType || "");

  if (error) {
    throw new Error(error.message);
  }

  return data as Product[];
};

/**
 * Paired categories for "You May Also Like". Each category has only one product
 * in it (in several colours), so its own category often can't fill the row —
 * these pairs top it up. Fixed rather than random so the carousel doesn't
 * reshuffle between renders.
 */
const FALLBACK_CATEGORY: Record<string, string> = {
  "lever-belts": "grip-tape",
  "grip-tape": "lever-belts",
  "knee-sleeves": "lifting-straps",
  "lifting-straps": "knee-sleeves",
};

const RELATED_LIMIT = 6;

/**
 * Up to six products to show alongside `excludeId`: everything else in its own
 * category first, then the paired category until the row is full.
 *
 * Both categories come back in one request and are ordered here, because the
 * "own category first" priority isn't something the query can express.
 */
export const getRelatedProducts = async (
  category: string,
  excludeId: number,
) => {
  const fallback = FALLBACK_CATEGORY[category.toLowerCase()];

  const { data, error } = await supabase
    .from("product")
    .select("*, reviews(rating)")
    .in("category", fallback ? [category, fallback] : [category])
    .neq("id", excludeId)
    // Within each category the better sellers fill the slots first.
    .order("sales_number", { ascending: false, nullsFirst: false });

  if (error) {
    throw new Error(error.message);
  }

  const rows = (data as Product[]) || [];

  return [
    ...rows.filter((p) => p.category === category),
    ...rows.filter((p) => p.category !== category),
  ].slice(0, RELATED_LIMIT);
};

export const getProductListBestSelling = async () => {
  const { data, error } = await supabase
    .from("product")
    .select("*, reviews(rating)")
    .order("sales_number", { ascending: false })
    .limit(5);

  if (error) {
    throw new Error(error.message);
  }

  return data as Product[];
};

export const getProductListWorstSelling = async () => {
  const { data, error } = await supabase
    .from("product")
    .select("*, reviews(rating)")
    .order("sales_number", { ascending: true })
    .limit(5);

  if (error) {
    throw new Error(error.message);
  }

  return data as Product[];
};
