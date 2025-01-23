import { CheckoutFormValues } from '@/shared/constants/checkout-form-schema';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);

export const createCheckoutSession = async (data: CheckoutFormValues) => {
  console.log(data.totalPrice);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: data.email,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Sample Product',
            description: data.comment || 'No additional comments', // Pass user comments here
          },
          unit_amount: data.totalPrice * 100, // Price in cents
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `http://localhost:3000`,
    cancel_url: `http://localhost:3000/cart`,
  });

  return session.url;
};
