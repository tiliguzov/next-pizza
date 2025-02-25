import React from 'react';
import { WhiteBlock } from '../white-block';
import { getCartItemDetails } from '@/shared/lib';
import { CheckoutItem } from '../checkout-item';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { useCart } from '@/shared/hooks';
import { CheckoutItemSkeleton } from '../checkout-item-skeleton';
import { priceInDollars } from '@/shared/lib/utils';

interface Props {
  loading?: boolean;
  className?: string;
}

export const CheckoutCart: React.FC<Props> = ({ loading, className }) => {
  const { updateItemQuantity, items, removeCartItem } = useCart();

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <WhiteBlock title="1. Cart" className={className}>
      <div className="flex flex-col gap-5">
        {loading
          ? [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />)
          : items.map((item) => (
              <CheckoutItem
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                details={getCartItemDetails(
                  item.ingredients,
                  item.pizzaType as PizzaType,
                  item.pizzaSize as PizzaSize,
                )}
                name={item.name}
                price={priceInDollars(item.price * item.quantity)}
                quantity={item.quantity}
                disabled={item.disabled}
                onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                onClickRemove={() => removeCartItem(item.id)}
              />
            ))}
      </div>
    </WhiteBlock>
  );
};
