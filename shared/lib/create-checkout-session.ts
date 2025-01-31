import { CheckoutFormValues } from '@/shared/constants/checkout-form-schema';
import { Address } from '../store';
import { getCustomerId, stripe } from '.';
import { DELIVERY_PRICE } from '../constants/payment';

export const createCheckoutSession = async (data: CheckoutFormValues, address: Address) => {
  const customerId = await getCustomerId(data.email, address, data.firstName + ' ' + data.lastName);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer: String(customerId),
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Sample Product',
            description: data.comment || 'No additional comments',
          },
          unit_amount: Math.floor(data.totalPrice * 100),
        },
        tax_rates: ['txr_1QnSmx2YBaZ7DgZdqhcUVxIC'],
        quantity: 1,
      },
    ],
    shipping_address_collection: {
      allowed_countries: ['US'],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: DELIVERY_PRICE * 100,
            currency: 'usd',
          },
          display_name: 'Standard Shipping',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 3 },
            maximum: { unit: 'business_day', value: 5 },
          },
        },
      },
    ],
    mode: 'payment',
    success_url: `http://localhost:3000`,
    cancel_url: `http://localhost:3000/cart`,
  });

  return session.url;
};
