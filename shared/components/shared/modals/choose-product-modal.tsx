'use client';

import React from 'react';
import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { cn } from '@/shared/lib/utils';
import { ChoosePizzaForm, ChooseProductForm } from '..';
import { useRouter } from 'next/navigation';
import { ProductWithRelations } from '@/@types/prisma';
import { useCartStore } from '@/shared/store';

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const firstVariation = product.variations[0];
  const isPizzaForm = Boolean(firstVariation.pizzaType);
  const addCartItem = useCartStore((state) => state.addCartItem);

  const onAddProduct = () => {
    addCartItem({
      productVariationId: firstVariation.id,
    });
  };

  const onAddPizza = (productVariationId: number, ingredients: number[]) => {
    addCartItem({
      productVariationId,
      ingredients,
    });
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className,
        )}>
        {isPizzaForm ? (
          <ChoosePizzaForm
            onClickAddCart={onAddPizza}
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            variations={product.variations}
          />
        ) : (
          <ChooseProductForm
            onClickAddCart={onAddProduct}
            imageUrl={product.imageUrl}
            name={product.name}
            price={firstVariation.price}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
