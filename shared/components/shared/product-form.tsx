'use client';

import { ProductWithRelations } from '@/@types/prisma';
import { useCartStore } from '@/shared/store';
import React from 'react';
import toast from 'react-hot-toast';
import { ChoosePizzaForm } from './choose-pizza-form';
import { ChooseProductForm } from './choose-product-form';

interface Props {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({ product, onSubmit: _OnSubmit }) => {
  const firstVariation = product.variations[0];
  const isPizzaForm = Boolean(firstVariation.pizzaType);
  const addCartItem = useCartStore((state) => state.addCartItem);
  const loading = useCartStore((state) => state.loading);

  const onSubmit = async (productVariationId?: number, ingredients?: number[]) => {
    try {
      const variationId = productVariationId ?? firstVariation.id;
      await addCartItem({ productVariationId: variationId, ingredients });

      toast.success('Product added to cart');
      _OnSubmit?.();
    } catch (error) {
      toast.error('Cant add product to cart');
      console.log(error);
    }
  };
  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        onClickAddCart={onSubmit}
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        variations={product.variations}
        loading={loading}
      />
    );
  }
  return (
    <ChooseProductForm
      onClickAddCart={() => onSubmit()}
      imageUrl={product.imageUrl}
      name={product.name}
      price={firstVariation.price}
      loading={loading}
    />
  );
};
