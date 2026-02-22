import { supabase } from "../supabase";

export const getDistinctCategories = async (): Promise<string[]> => {
  const { data, error } = await supabase
    .from("product")
    .select("category")
    .not("category", "is", null);

  if (error) {
    throw new Error(error.message);
  }

  const categories = [
    ...new Set(
      data
        .map((d: { category: string | null }) => d.category)
        .filter((c): c is string => c !== null),
    ),
  ];

  return categories;
};
