import { Product } from '@prisma/client';
import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';

export const search = async (query: string): Promise<Product[]> => {
  console.log('QUERY', query);
  const { data } = await axiosInstance.get<{ products: Product[] }>(ApiRoutes.SEARCH_PRODUCTS, {
    params: { query },
  });

  //  console.log(data);

  return data.products;
};
