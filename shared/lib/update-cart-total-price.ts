import { prisma } from '@/prisma/prisma-client';
import { calcCartItemTotalPrice } from './calc-cart-item-total-price';

export const updateCartTotalPrice = async (token: string) => {
  const userCart = await prisma.cart.findFirst({
    where: {
      token,
    },
    include: {
      items: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          productVariation: {
            include: {
              product: true,
            },
          },
          ingredients: true,
        },
      },
    },
  });

  if (!userCart) {
    return 0;
  }

  const totalPrice = userCart.items.reduce((acc, item) => {
    return acc + calcCartItemTotalPrice(item) * item.quantity;
  }, 0);

  return await prisma.cart.update({
    where: {
      id: userCart.id,
    },
    data: {
      totalPrice,
    },
    include: {
      items: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          productVariation: {
            include: {
              product: true,
            },
          },
          ingredients: true,
        },
      },
    },
  });
};
