import { axiosInstance } from './instance';
import { CartDTO } from './dto/cart.dto';
import { ApiRoutes } from './constants';

export const fetchCart = async (): Promise<CartDTO> => {
  const { data } = await axiosInstance.get<CartDTO>(ApiRoutes.CART);

  return data;
};
