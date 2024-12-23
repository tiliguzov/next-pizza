import { Api } from '@/services/api-client';
import { Ingredient } from '@prisma/client';
import React from 'react';

export type IngredientItem = Pick<Ingredient, 'id' | 'name'>;

interface ReturnProps {
  ingredients: IngredientItem[];
  loading: boolean;
}

export const useIngredients = (): ReturnProps => {
  const [ingredients, setIngredients] = React.useState<IngredientItem[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true);
        const ingredients = await Api.ingredients.getAll();
        setIngredients(
          ingredients.map((ingredient) => ({
            id: ingredient.id,
            name: ingredient.name,
          })),
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchIngredients();
  }, []);

  return { ingredients, loading };
};
