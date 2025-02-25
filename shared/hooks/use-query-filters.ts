'use client';

import { useRouter } from 'next/navigation';
import { Filters } from './use-filters';
import React from 'react';
import { createFilterQueryParams } from '../lib/create-filter-query-params';

export const useQueryFilters = (filters: Filters) => {
  const isMounted = React.useRef(false);
  const router = useRouter();

  React.useEffect(() => {
    if (isMounted.current) {
      const query = createFilterQueryParams(filters);

      router.push(`/?${query}`, { scroll: false });
    }
    isMounted.current = true;
  }, [filters]);
};
