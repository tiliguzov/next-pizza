'use client';

import React from 'react';
import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { cn } from '@/shared/lib/utils';
import { ChoosePizzaForm, ChooseProductForm } from '..';
import { useRouter } from 'next/navigation';
import { ProductWithRelations } from '@/@types/prisma';
import { useCartStore } from '@/shared/store';
import toast from 'react-hot-toast';

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const firstVariation = product.variations[0];
  const isPizzaForm = Boolean(firstVariation.pizzaType);
  const addCartItem = useCartStore((state) => state.addCartItem);
  const loading = useCartStore((state) => state.loading);

  const onSubmit = async (productVariationId?: number, ingredients?: number[]) => {
    try {
      const variationId = productVariationId ?? firstVariation.id;
      await addCartItem({ productVariationId: variationId, ingredients });

      toast.success('Product added to cart');
      router.back();
    } catch (error) {
      toast.error('Cant add product to cart');
      console.log(error);
    }
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
            onClickAddCart={() => onSubmit()}
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            variations={product.variations}
            loading={loading}
          />
        ) : (
          <ChooseProductForm
            onClickAddCart={() => onSubmit()}
            imageUrl={product.imageUrl}
            name={product.name}
            price={firstVariation.price}
            loading={loading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
