import { useSearchParams } from 'next/navigation';
import React from 'react';
import { useSet } from 'react-use';

interface QueryFilters extends PriceProps {
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
}

export interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

export interface Filters {
  sizes: Set<string>;
  pizzaTypes: Set<string>;
  selectedIngredients: Set<string>;
  prices: PriceProps;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void;
  setPizzaTypes: (key: string) => void;
  setSizes: (key: string) => void;
  setSelectedIngredients: (key: string) => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

  /* Ingredients filter */
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(
      searchParams.get('ingredients') ? searchParams.get('ingredients')?.split(',') : [],
    ),
  );

  /* Sizes filter */
  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(searchParams.get('sizes') ? searchParams.get('sizes')?.split(',') : []),
  );

  /* Pizza types filter */
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(
      searchParams.get('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : [],
    ),
  );

  /* Prices filter */
  const [prices, setPrices] = React.useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    sizes,
    pizzaTypes,
    selectedIngredients,
    prices,
    setPrices: updatePrice,
    setPizzaTypes: togglePizzaTypes,
    setSizes: toggleSizes,
    setSelectedIngredients: toggleIngredients,
  };
};
