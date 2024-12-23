'use client';

import React from 'react';
import { CheckboxFiltersGroup, FilterCheckbox, RangeSlider, Title } from '.';
import { Input } from '../ui';
import { useFilterIngredients } from '@/hooks/useFilterIngredients';
import useSet from 'react-use/lib/useSet';

interface Props {
  className?: string;
}

interface PriceProps {
  priceFrom: number;
  priceTo: number;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const {
    ingredients,
    loading,
    onAddIngredient,
    selectedIngredients: selectedIngredinents,
  } = useFilterIngredients();
  const [prices, setPrices] = React.useState<PriceProps>({ priceFrom: 0, priceTo: 1000 });

  const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>([]));
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(new Set<string>([]));

  const items = ingredients.map((ingredient) => ({
    value: String(ingredient.id),
    text: ingredient.name,
  }));

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices({
      ...prices,
      [name]: value,
    });
  };

  return (
    <div className={className}>
      <Title text="Filters" size="sm" className="mb-5 font-bold" />

      {/* Верхние чекбоксы */}
      <CheckboxFiltersGroup
        name="pizzaTypes"
        className="mb-5"
        title="Типы теста"
        onClickCkeckbox={togglePizzaTypes}
        selected={pizzaTypes}
        items={[
          { text: 'тонкое', value: '1' },
          { text: 'традиционное', value: '2' },
        ]}
      />

      <CheckboxFiltersGroup
        name="sizes"
        className="mb-5"
        title="Размеры"
        onClickCkeckbox={toggleSizes}
        selected={sizes}
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
            value={String(prices.priceFrom)}
            onChange={(e) => updatePrice('priceFrom', Number(e.target.value))}
          />
          <Input
            type="number"
            min={0}
            max={1000}
            placeholder="1000"
            value={String(prices.priceTo)}
            onChange={(e) => updatePrice('priceTo', Number(e.target.value))}
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[prices.priceFrom, prices.priceTo]}
          onValueChange={([priceFrom, priceTo]) => setPrices({ priceFrom, priceTo })}
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
        onClickCkeckbox={onAddIngredient}
        selected={selectedIngredinents}
      />
    </div>
  );
};
