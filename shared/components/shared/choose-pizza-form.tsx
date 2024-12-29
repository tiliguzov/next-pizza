import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Button } from '../ui';
import { GroupVariants, IngredientItem, PizzaImage, Title } from '.';
import {
  mapPizzaSize,
  mapPizzaType,
  PizzaSize,
  pizzaSizes,
  PizzaType,
  pizzaTypes,
} from '@/shared/constants/pizza';
import { Ingredient, ProductVariation } from '@prisma/client';
import { useSet } from 'react-use';

interface Props {
  imageUrl: string;
  name: string;
  className?: string;
  ingredients: Ingredient[];
  variations: ProductVariation[];
  onClickAddCart?: VoidFunction;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  variations,
  imageUrl,
  ingredients,
  onClickAddCart,
  className,
}) => {
  const [size, setSize] = React.useState<PizzaSize>(variations[0].size as PizzaSize);
  const [type, setType] = React.useState<PizzaType>(variations[0].pizzaType as PizzaType);

  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));

  const currentVariant = variations.find(
    (variation) => variation.pizzaType === type && variation.size === size,
  );

  if (!currentVariant) {
    setSize(variations.find((variation) => variation.pizzaType === type)?.size as PizzaSize);
  }

  const pizzaPrice = currentVariant?.price || 0;

  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  const textDetails = `${size} sm, ${mapPizzaType[type]} dough`;
  const totalPrice = pizzaPrice + totalIngredientsPrice;

  const handleOnClickCart = () => {
    onClickAddCart?.();
    console.log({ size, type, ingredients: selectedIngredients });
  };

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
