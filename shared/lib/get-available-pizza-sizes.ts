import { ProductVariation } from '@prisma/client';
import { mapPizzaSize, mapPizzaType, pizzaSizes, pizzaTypes } from '../constants/pizza';
import { Variant } from '../components/shared/group-variants';

interface ReturnProps {
  availablePizzaTypes: Variant[];
  availablePizzaSizes: Variant[];
}

export const getAvailablePizzaSizes = (
  type: number,
  variations: ProductVariation[],
): ReturnProps => {
  const availablePizzaTypes = pizzaTypes.map((pizzaType) => ({
    name: pizzaType.name,
    value: pizzaType.value,
    disabled: !variations.find((variation) => {
      const type = variation.pizzaType as 1 | 2;
      return mapPizzaType[type] === pizzaType.name;
    }),
  }));

  const availablePizzaSizes = pizzaSizes.map((pizzaSize) => ({
    name: pizzaSize.name,
    value: pizzaSize.value,
    disabled: !variations.find((variation) => {
      const size = variation.size as 20 | 30 | 40;
      return mapPizzaSize[size] === pizzaSize.name && type === variation.pizzaType;
    }),
  }));

  return { availablePizzaTypes, availablePizzaSizes };
};
