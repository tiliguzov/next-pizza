'use client';

import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Button } from '../ui';
import { GroupVariants, IngredientItem, PizzaImage, Title } from '.';
import { mapPizzaType, PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { Ingredient, ProductVariation } from '@prisma/client';
import { calcTotalPizzaPrice, getAvailablePizzaSizes } from '@/shared/lib';
import { usePizzaOptions } from '@/shared/hooks';

interface Props {
  imageUrl: string;
  name: string;
  className?: string;
  ingredients: Ingredient[];
  variations: ProductVariation[];
  onClickAddCart: (variationId: number, ingredients: number[]) => void;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  variations,
  imageUrl,
  ingredients,
  onClickAddCart,
  className,
}) => {
  const { size, type, selectedIngredients, currentVariationId, setSize, setType, addIngredient } =
    usePizzaOptions(variations);

  const textDetails = `${size} sm, ${mapPizzaType[type]} dough`;
  const totalPrice = calcTotalPizzaPrice(size, type, variations, ingredients, selectedIngredients);

  const handleOnClickCart = () => {
    if (currentVariationId) {
      onClickAddCart(currentVariationId, Array.from(selectedIngredients));
    }
  };

  const { availablePizzaSizes, availablePizzaTypes } = getAvailablePizzaSizes(type, variations);

  return (
    <div className={cn(className, 'flex flex-1')}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400"> {textDetails}</p>

        <div className="flex flex-col gap-4 mt-5">
          <GroupVariants
            items={availablePizzaSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariants
            items={availablePizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
          onClick={handleOnClickCart}>
          Добавить в корзину за {totalPrice} $
        </Button>
      </div>
    </div>
  );
};
