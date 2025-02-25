import qs from 'qs';
import { Filters } from '../hooks/use-filters';

export const createFilterQueryParams = (filters: Filters) => {
  const params = {
    ...filters.prices,
    pizzaTypes: Array.from(filters.pizzaTypes),
    sizes: Array.from(filters.sizes),
    ingredients: Array.from(filters.selectedIngredients),
  };

  const query = qs.stringify(params, { arrayFormat: 'comma' });

  return query;
};
