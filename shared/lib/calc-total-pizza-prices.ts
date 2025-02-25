import { Ingredient, ProductVariation } from '@prisma/client';

export const calcTotalPizzaPrice = (
  variations: ProductVariation[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
  currentVariationId?: number,
) => {
  const pizzaPrice =
    variations.find((variation) => variation.id === currentVariationId)?.price || 0;

  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return pizzaPrice + totalIngredientsPrice;
};
