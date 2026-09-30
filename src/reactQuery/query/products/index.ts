import {
  getFilteredProducts,
  getProductListBestSelling,
  getProductListWithCategory,
  getProductListWorstSelling,
  getProductVariants,
  getRelatedProducts,
  getSingleProduct,
  PaginatedProducts,
  Product,
  ProductFilters,
  ProductVariantRow,
} from "@/supabase/products";
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

export const useGetFilteredProducts = <T = PaginatedProducts>({
  queryOptions,
  filters,
}: {
  queryOptions?: Omit<UseQueryOptions<PaginatedProducts, Error, T>, "queryKey">;
  filters: ProductFilters;
}): UseQueryResult<T, Error> => {
  return useQuery<PaginatedProducts, Error, T>({
    queryKey: [
      "filteredProducts",
      filters.search,
      filters.priceRange,
      filters.categories,
      filters.sortBy,
      filters.page,
    ],
    queryFn: () => getFilteredProducts(filters),
    staleTime: 30 * 1000,
    ...queryOptions,
  });
};

export const useGetProductListWithCategory = <T = Product[]>(
  {
    queryOptions,
  }: {
    queryOptions?: Omit<UseQueryOptions<Product[], Error, T>, "queryKey">;
  } = {},
  productType: string | undefined,
): UseQueryResult<T, Error> => {
  return useQuery<Product[], Error, T>({
    queryKey: ["productsWithCategory", productType],
    queryFn: () => {
      return getProductListWithCategory(productType);
    },
    staleTime: 60 * 1000,
    // Without this the query fires with `productType: undefined`, which sends
    // `category=ilike.` and matches nothing. The carousel components call all
    // three product hooks unconditionally and pick one by `carouselType`, so on
    // the home page that was a wasted round trip per carousel; on the product
    // page it fired once before the product (and therefore its category) had
    // even loaded.
    enabled: !!productType,
    ...queryOptions,
  });
};

export const useGetProductListWithBestSelling = <T = Product[]>({
  queryOptions,
}: {
  queryOptions?: Omit<UseQueryOptions<Product[], Error, T>, "queryKey">;
} = {}): UseQueryResult<T, Error> => {
  return useQuery<Product[], Error, T>({
    queryKey: ["bestSellingProducts"],
    queryFn: getProductListBestSelling,
    staleTime: 60 * 1000,
    ...queryOptions,
  });
};

export const useGetProductListWithWorstSelling = <T = Product[]>({
  queryOptions,
}: {
  queryOptions?: Omit<UseQueryOptions<Product[], Error, T>, "queryKey">;
} = {}): UseQueryResult<T, Error> => {
  return useQuery<Product[], Error, T>({
    queryKey: ["worstSellingProducts"],
    queryFn: getProductListWorstSelling,
    staleTime: 60 * 1000,
    ...queryOptions,
  });
};

export const useGetRelatedProducts = <T = Product[]>(
  {
    queryOptions,
  }: {
    queryOptions?: Omit<UseQueryOptions<Product[], Error, T>, "queryKey">;
  } = {},
  category: string | undefined,
  excludeId: number | undefined,
): UseQueryResult<T, Error> => {
  return useQuery<Product[], Error, T>({
    queryKey: ["relatedProducts", category, excludeId],
    queryFn: () => getRelatedProducts(category as string, excludeId as number),
    // The carousel calls every product hook and picks one by `carouselType`,
    // so this stays idle on the pages that aren't showing related products.
    enabled: !!category && excludeId !== undefined,
    staleTime: 60 * 1000,
    ...queryOptions,
  });
};

export const useGetProductVariants = <T = ProductVariantRow[]>(
  {
    queryOptions,
  }: {
    queryOptions?: Omit<
      UseQueryOptions<ProductVariantRow[], Error, T>,
      "queryKey"
    >;
  } = {},
  variantGroup: string | null | undefined,
): UseQueryResult<T, Error> => {
  return useQuery<ProductVariantRow[], Error, T>({
    queryKey: ["productVariants", variantGroup],
    queryFn: () => getProductVariants(variantGroup as string),
    // A product with no group has no colour options, so there is nothing to
    // ask for — without this it would query for `variant_group=is.null`.
    enabled: !!variantGroup,
    staleTime: 60 * 1000,
    ...queryOptions,
  });
};

export const useGetSingleProduct = <T>(
  {
    queryOptions,
  }: {
    queryOptions?: Omit<UseQueryOptions<Product, Error, T>, "queryKey">;
  } = {},
  id: string | undefined,
): UseQueryResult<T, Error> => {
  return useQuery<Product, Error, T>({
    queryKey: ["singleProduct", id],
    queryFn: () => {
      if (!id) {
        throw new Error("User ID is undefined");
      }
      return getSingleProduct(id);
    },
    ...queryOptions,
  });
};
