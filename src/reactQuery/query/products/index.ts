import {
  getProductList,
  getProductListBestSelling,
  getProductListWithCategory,
  getProductListWorstSelling,
  getSingleProduct,
  Product,
} from "@/supabase/products";
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

export const useGetProductList = <T = Product[]>({
  queryOptions,
}: {
  queryOptions?: Omit<UseQueryOptions<Product[], Error, T>, "queryKey">;
} = {}): UseQueryResult<T, Error> => {
  return useQuery<Product[], Error, T>({
    queryKey: ["products"],
    queryFn: getProductList,
    staleTime: 60 * 1000,
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
    queryKey: ["WorstSellingProducts"],
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
