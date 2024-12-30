import { ProductVariation } from '@prisma/client';
import React from 'react';
import { PizzaSize, PizzaType } from '../constants/pizza';
import { useSet } from 'react-use';

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  selectedIngredients: Set<number>;
  setSize: (size: PizzaSize) => void;
  setType: (type: PizzaType) => void;
  addIngredient: (id: number) => void;
}

export const usePizzaOptions = (variations: ProductVariation[]): ReturnProps => {
  const [size, setSize] = React.useState<PizzaSize>(variations[0].size as PizzaSize);
  const [type, setType] = React.useState<PizzaType>(variations[0].pizzaType as PizzaType);
  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));

  React.useEffect(() => {
    const currentVariant = variations.find(
      (variation) => variation.pizzaType === type && variation.size === size,
    );

    if (!currentVariant) {
      setSize(variations.find((variation) => variation.pizzaType === type)?.size as PizzaSize);
    }
  }, [type]);

  return {
    size,
    type,
    selectedIngredients,
    setSize,
    setType,
    addIngredient,
  };
};
