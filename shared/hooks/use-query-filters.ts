import { useRouter } from 'next/navigation';
import { Filters } from './use-filters';
import React from 'react';
import qs from 'qs';

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();

  React.useEffect(() => {
    const params = {
      ...filters.prices,
      pizzaTypes: Array.from(filters.pizzaTypes),
      sizes: Array.from(filters.sizes),
      ingredients: Array.from(filters.selectedIngredients),
    };

    const query = qs.stringify(params, { arrayFormat: 'comma' });

    if (query) router.push(`/?${query}`, { scroll: false });
  }, [filters, router]);
};
