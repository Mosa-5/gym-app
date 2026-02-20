import { supabase } from "../supabase";

export const getProductList = async () => {
  const { data, error } = await supabase.from("product").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data as Product[];
};

export type Product = {
  category: string | null;
  created_at: string;
  description: string | null;
  id: number;
  image_url: string[] | null;
  name: string | null;
  price: number | null;
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
