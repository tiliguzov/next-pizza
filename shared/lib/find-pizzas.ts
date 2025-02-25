import { prisma } from '@/prisma/prisma-client';

export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  sizes?: string;
  pizzaTypes?: string;
  ingredients?: string;
  priceFrom?: string;
  priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 2000;

export const findPizzas = async (params: GetSearchParams) => {
  const sizes = params.sizes?.split(',').map(Number);
  const pizzasTypes = params.pizzaTypes?.split(',').map(Number);
  const ingredientsIdsArr = params.ingredients?.split(',').map(Number);

  const minPrice = Math.round(Number(params.priceFrom) * 100) || DEFAULT_MIN_PRICE;
  const maxPrice = Math.round(Number(params.priceTo) * 100) || DEFAULT_MAX_PRICE;

  const categories = await prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          id: 'desc',
        },
        where: {
          ingredients: ingredientsIdsArr
            ? {
                some: {
                  id: {
                    in: ingredientsIdsArr,
                  },
                },
              }
            : undefined,
          variations: {
            some: {
              size: {
                in: sizes,
              },
              pizzaType: {
                in: pizzasTypes,
              },
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
          },
        },
        include: {
          ingredients: true,
          variations: {
            where: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
            orderBy: {
              price: 'asc',
            },
          },
        },
      },
    },
  });

  return categories;
};
