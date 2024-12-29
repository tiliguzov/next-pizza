'use client';

import React from 'react';
import { CheckboxFiltersGroup, RangeSlider, Title } from '.';
import { Input } from '../ui';
import { useFilters, useIngredients, useQueryFilters } from '@/shared/hooks';

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();

  useQueryFilters(filters);

  const updatePrices = (prices: number[]) => {
    filters.setPrices('priceFrom', prices[0]);
    filters.setPrices('priceTo', prices[1]);
  };

  const items = ingredients.map((ingredient) => ({
    value: String(ingredient.id),
    text: ingredient.name,
  }));

  return (
    <div className={className}>
      <Title text="Filters" size="sm" className="mb-5 font-bold" />

      {/* Upper checkboxes */}
      <CheckboxFiltersGroup
        name="pizzaTypes"
        className="mb-5"
        title="Типы теста"
        onClickCkeckbox={filters.setPizzaTypes}
        selected={filters.pizzaTypes}
        items={[
          { text: 'тонкое', value: '1' },
          { text: 'традиционное', value: '2' },
        ]}
      />

      <CheckboxFiltersGroup
        name="sizes"
        className="mb-5"
        title="Размеры"
        onClickCkeckbox={filters.setSizes}
        selected={filters.sizes}
        items={[
          { text: '20 см', value: '20' },
          { text: '30 см', value: '30' },
          { text: '40 см', value: '40' },
        ]}
      />

      {/* Фильтр цен */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={String(filters.prices.priceFrom)}
            onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}
          />
          <Input
            type="number"
            min={0}
            max={1000}
            placeholder="1000"
            value={String(filters.prices.priceTo)}
            onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]}
          onValueChange={updatePrices}
        />
      </div>

      <CheckboxFiltersGroup
        title="Ingridients"
        name="Ingredients"
        className="mt-5"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCkeckbox={filters.setSelectedIngredients}
        selected={filters.selectedIngredients}
      />
    </div>
  );
};
