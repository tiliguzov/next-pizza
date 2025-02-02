import { PizzaSize, PizzaType } from './../constants/pizza';
import { CheckoutFormValues } from '@/shared/constants/checkout-form-schema';
import { Address } from '../store';
import { getCartItemDetails, getCustomerId, stripe } from '.';
import { DELIVERY_PRICE } from '../constants/payment';
import { CartStateItem } from './get-cart-details';

export const createCheckoutSession = async (
  data: CheckoutFormValues,
  address: Address,
  cartItems: CartStateItem[],
  orderId: string,
) => {
  //(async () => {
  //  try {
  //    const taxRate = await stripe.taxRates.create({
  //      display_name: 'Sales Tax',
  //      description: 'Applicable Sales Tax',
  //      jurisdiction: 'US',
  //      percentage: 7.5,
  //      inclusive: false,
  //    });
  //    console.log('Created tax rate:', taxRate.id);
  //  } catch (error) {
  //    console.error('Error creating tax rate:', error);
  //  }
  //})();
  const customerId = await getCustomerId(data.email, address, data.firstName + ' ' + data.lastName);

  const lineItems = cartItems.map((item) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: getCartItemDetails(
            item.ingredients,
            item.pizzaType as PizzaType,
            item.pizzaSize as PizzaSize,
          ),
          images: [item.imageUrl],
        },

        unit_amount: Math.floor(item.price * 100),
      },
      quantity: item.quantity,
      tax_rates: ['txr_1Qnp6m2YBaZ7DgZd4NXm941B'],
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer: String(customerId),
    line_items: lineItems,
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
    success_url: `http://localhost:3000/?paid`,
    cancel_url: `http://localhost:3000/?cancelled`,
    metadata: {
      orderId,
    },
  });

  console.log(session.url);

  return session.url;
};
