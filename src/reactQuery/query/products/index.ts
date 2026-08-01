import {
  getFilteredProducts,
  getProductListBestSelling,
  getProductListWithCategory,
  getProductListWorstSelling,
  getSingleProduct,
  PaginatedProducts,
  Product,
  ProductFilters,
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
