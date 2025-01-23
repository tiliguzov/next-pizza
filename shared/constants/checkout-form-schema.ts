import { z } from 'zod';

export const checkoutFormSchema = z.object({
  firstName: z.string().min(2, { message: 'name must contain at least 2 symbols' }),
  lastName: z.string().min(2, { message: 'last name must contain at least 2 symbols' }),
  email: z.string().email({ message: 'enter the correct email address' }),
  phone: z.string().min(10, { message: 'enter the correct phone' }),
  address: z.string().min(5, { message: 'enter the correct address' }),
  comment: z.string().optional(),
  totalPrice: z.number(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
