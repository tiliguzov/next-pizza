'use server';

import { prisma } from '@/prisma/prisma-client';
import { PayOrderTemplate, VerificationUserTemplate } from '@/shared/components';
import { CheckoutFormValues } from '@/shared/constants/checkout-form-schema';
import { createCheckoutSession, sendEmail } from '@/shared/lib';
import { CartStateItem } from '@/shared/lib/get-cart-details';
import { getUserSession } from '@/shared/lib/get-user-session';
import { Address } from '@/shared/store';
import { OrderStatus, Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { cookies } from 'next/headers';

export async function createOrder(
  data: CheckoutFormValues,
  address: Address,
  cartItems: CartStateItem[],
) {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get('cartToken')?.value;

    if (!cartToken) {
      throw new Error('Cart token not found');
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productVariation: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    if (!userCart) {
      throw new Error('Cart not found');
    }

    if (userCart?.totalPrice === 0) {
      throw new Error('Cart is empty');
    }

    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalPrice: userCart.totalPrice,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalPrice: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    const response = await createCheckoutSession(data, address, cartItems, String(order.id));

    const url = response;

    if (!url) {
      throw 'Cant create payment';
    }

    await sendEmail(
      data.email,
      'Next Pizza / Pay for the order #' + order.id,
      PayOrderTemplate({
        orderId: order.id,
        totalPrice: order.totalPrice,
        paymentUrl: url,
      }),
    );

    return url;
  } catch (err) {
    console.log('[CreateOrder] Server error', err);
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error('User is not found');
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
      },
    });
  } catch (err) {
    console.log('Error [UPDATE_USER]', err);
    throw err;
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error('Email is not confirmed');
      }

      throw new Error('User is already exists');
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    await sendEmail(
      createdUser.email,
      'Next Pizza / Account Confirmation',
      VerificationUserTemplate({
        code,
      }),
    );
  } catch (error) {
    console.log('[REGISTER USER] ', error);
    throw error;
  }
}
