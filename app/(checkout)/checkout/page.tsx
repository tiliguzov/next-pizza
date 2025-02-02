'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useCart } from '@/shared/hooks';
import {
  CheckoutSidebar,
  Container,
  Title,
  CheckoutCart,
  CheckoutDeliveryInfo,
  CheckoutPersonalInfo,
  CheckoutCartEmpty,
} from '@/shared/components';

import { checkoutFormSchema, CheckoutFormValues } from '@/shared/constants/checkout-form-schema';
import { createOrder } from '@/app/actions';
import toast from 'react-hot-toast';
import React from 'react';
import { useAddressStore, useCartStore } from '@/shared/store';

export default function CheckoutPage() {
  const { totalAmount, loading } = useCart();
  const [submiting, setSubmiting] = React.useState(false);
  const address = useAddressStore((state) => state.address);
  const cartItems = useCartStore((state) => state.items);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      addressId: '',
      comment: '',
      totalPrice: 0,
    },
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmiting(true);
      const url = await createOrder(data, address, cartItems);

      if (url) {
        toast.success('Order is successfully created! redirection to payment...');
        location.href = url;
      } else {
        throw "URL didn't create";
      }
    } catch (err) {
      setSubmiting(false);
      console.log(err);
      toast.error("Couldn't create an order");
    } finally {
      setSubmiting(false);
    }
  };

  const onError = (errors: any) => {
    console.log('Validation Errors:', errors);
  };

  if (!cartItems.length) {
    return <CheckoutCartEmpty className="h-[70vh]" />;
  }

  return (
    <Container className="mt-10">
      <Title className="font-extrabold mb-8 text-[36px]" text="Making an order" />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onError)}>
          <div className="flex gap-10">
            {/* Left part */}

            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart loading={loading} />
              <CheckoutPersonalInfo className={loading ? 'opacity-40 pointer-events-none' : ''} />
              <CheckoutDeliveryInfo className={loading ? 'opacity-40 pointer-events-none' : ''} />
            </div>

            {/* Right part */}
            <div className="w-[450px]">
              <CheckoutSidebar totalAmount={totalAmount} loading={loading || submiting} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
