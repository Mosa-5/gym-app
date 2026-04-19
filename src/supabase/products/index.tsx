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

  let query = supabase.from("product").select("*", { count: "exact" });

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
};

export const mapProductTableData = (datalist: Product[]) => {
  return datalist.map((data) => ({
    category: data.category || "",
    created_at: data.created_at || "",
    description: data.description || "",
    image_url: data.image_url || [],
    name: data.name || "",
    price: data.price ?? 0,
    id: data.id,
  }));
};

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
});

export const getProductListWithCategory = async (
  productType: string | undefined,
) => {
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .ilike("category", productType || "");

  if (error) {
    throw new Error(error.message);
  }

  return data as Product[];
};

export const getProductListBestSelling = async () => {
  const { data, error } = await supabase
    .from("product")
    .select("*")
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
    .select("*")
    .order("sales_number", { ascending: true })
    .limit(5);

  if (error) {
    throw new Error(error.message);
  }

  return data as Product[];
};
