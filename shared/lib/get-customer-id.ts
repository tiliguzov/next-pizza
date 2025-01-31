import { stripe } from '.';
import { Address } from '../store';

export const getCustomerId = async (email: string, address: Address, fullName: string) => {
  const customers = await stripe.customers.list({
    email,
    limit: 1,
  });

  const customerId =
    customers.data.length > 0
      ? customers.data[0].id
      : await stripe.customers
          .create({
            email: email,
            name: fullName,
            address: {
              line1: address.addressLine1,
              city: address.city,
              state: address.state,
              postal_code: address.postalCode,
              country: address.country,
            },
          })
          .then((newCustomer) => newCustomer.id)
          .catch((error) => {
            console.error('Error creating customer:', error);
            throw new Error('Failed to create customer');
          });
  return customerId;
};
