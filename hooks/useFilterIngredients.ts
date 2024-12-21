import React from 'react';
import { Api } from '@/services/api-client';
import { Ingredient } from '@prisma/client';

type IngredientItem = Pick<Ingredient, 'id' | 'name'>;

interface ReturnProps {
  ingredients: IngredientItem[];
}

export const useFilterIngredients = (): ReturnProps => {
  const [ingredients, setIngredients] = React.useState<IngredientItem[]>([]);

  React.useEffect(() => {
    async function fetchIngredients() {
      try {
        const ingredients = await Api.ingredients.getAll();
        setIngredients(
          ingredients.map((ingredient) => ({
            id: ingredient.id,
            name: ingredient.name,
          })),
        );
      } catch (error) {
        console.log(error);
      }
    }

    fetchIngredients();
  }, []);

  return { ingredients };
};
