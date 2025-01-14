'use client';

import {
  CheckoutItem,
  CheckoutItemDetails,
  Container,
  Title,
  WhiteBlock,
} from '@/shared/components/shared';
import { Button, Input, Textarea } from '@/shared/components/ui';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { useCart } from '@/shared/hooks';
import { getCartItemDetails } from '@/shared/lib';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';

export default function CheckoutPage() {
  const { totalAmount, updateItemQuantity, items, removeCartItem } = useCart();

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container className="mt-10">
      <Title className="font-extrabold mb-8 text-[36px]" text="Making an order" />

      <div className="flex gap-10">
        {/* Left part */}
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <WhiteBlock title="1. Cart">
            <div className="flex flex-col gap-5">
              {items.map((item) => (
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
                  price={item.price}
                  quantity={item.quantity}
                  disabled={item.disabled}
                  onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                  onClickRemove={() => removeCartItem(item.id)}
                />
              ))}
            </div>
          </WhiteBlock>

          <WhiteBlock title="2. Personal information">
            <div className="grid grid-cols-2 gap-5">
              <Input name="firstName" className="text-base" placeholder="name" />
              <Input name="lastName" className="text-base" placeholder="last name" />
              <Input name="email" className="text-base" placeholder="email" />
              <Input name="phone" className="text-base" placeholder="phone number" />
            </div>
          </WhiteBlock>

          <WhiteBlock title="3. Delivery address">
            <div className="flex flex-col gap-5">
              <Input name="firstName" className="text-base" placeholder="Delivery address" />
              <Textarea rows={5} className="text-base" placeholder="comment on the order" />
            </div>
          </WhiteBlock>
        </div>

        {/* Right part */}
        <div className="w-[450px]">
          <WhiteBlock className="p-6 sticky top-4">
            <div className="flex flex-col gap-1">
              <span className="text-xl">Total</span>
              <span className="text-[34px] font-extrabold">{totalAmount}$</span>
            </div>

            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <Package size={18} className="mr-2 text-gray-400" />
                  Cost of products:
                </div>
              }
              value="3000$"
            />
            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <Percent size={18} className="mr-2 text-gray-400" />
                  Taxes:
                </div>
              }
              value="100$"
            />
            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <Truck size={18} className="mr-2 text-gray-400" />
                  Delivery:
                </div>
              }
              value="120$"
            />

            <Button type="submit" className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
              Proceed to payment
              <ArrowRight className="w-5 ml-2" />
            </Button>
          </WhiteBlock>
        </div>
      </div>
    </Container>
  );
}
