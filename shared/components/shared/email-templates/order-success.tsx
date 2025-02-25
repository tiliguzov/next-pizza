import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import React from 'react';

interface Props {
  orderId: number;
  items: CartItemDTO[];
}

export const OrderSuccessTemplate: React.FC<Props> = ({ orderId, items }) => {
  return (
    <div>
      <h1> Thanks for payment! </h1>

      <hr />

      <p> Your order #${orderId} is paid. List of products:</p>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {/* TODO: ingredients*/}
            {item.productVariation.product.name} | {item.productVariation.price} x {item.quantity}{' '}
            pcs = {item.productVariation.price * item.quantity} $
          </li>
        ))}
      </ul>
    </div>
  );
};
