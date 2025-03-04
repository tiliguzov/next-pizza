import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import crypto from 'crypto';
import { findOrCreateCart } from '@/shared/lib/find-or-create-cart';
import { CreateCartItemDTO } from '@/shared/services/dto/cart.dto';
import { updateCartTotalPrice } from '@/shared/lib/update-cart-total-price';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ totalPrice: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            token,
          },
        ],
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            productVariation: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (error) {
    console.log('[CART_GET] Server error', error);
    return NextResponse.json({ message: 'Cant get cart' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    const data = (await req.json()) as CreateCartItemDTO;

    const findCartItems = await prisma.cartItem.findMany({
      where: {
        cartId: userCart.id,
        productVariationId: data.productVariationId,
        ingredients: {
          every: {
            id: {
              in: data.ingredients,
            },
          },
        },
      },
      include: {
        ingredients: true,
      },
    });

    const findCartItem = findCartItems.find(
      (item) => item.ingredients.length === data.ingredients?.length,
    );

    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productVariationId: data.productVariationId,
          quantity: 1,
          ingredients: {
            connect: data.ingredients?.map((id) => ({
              id,
            })),
          },
        },
      });
    }

    const updatedUserCart = await updateCartTotalPrice(token);

    const resp = NextResponse.json(updatedUserCart);
    resp.cookies.set('cartToken', token);
    return resp;
  } catch (error) {
    console.log('[CART_POST] Server error', error);
    return NextResponse.json({ message: 'Cant create cart' }, { status: 500 });
  }
}
