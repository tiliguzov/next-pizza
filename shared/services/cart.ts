import { axiosInstance } from './instance';
import { CartDTO, CreateCartItemDTO } from './dto/cart.dto';
import { ApiRoutes } from './constants';

export const getCart = async (): Promise<CartDTO> => {
  return (await axiosInstance.get<CartDTO>(ApiRoutes.CART)).data;
};

export const updateItemQuantity = async (itemId: number, quantity: number): Promise<CartDTO> => {
  return (await axiosInstance.patch<CartDTO>(ApiRoutes.CART + '/' + itemId, { quantity })).data;
};

export const removeCartItem = async (itemId: number): Promise<CartDTO> => {
  return (await axiosInstance.delete<CartDTO>(ApiRoutes.CART + '/' + itemId)).data;
};

export const addCartItem = async (values: CreateCartItemDTO): Promise<CartDTO> => {
  return (await axiosInstance.post<CartDTO>(ApiRoutes.CART, values)).data;
};
