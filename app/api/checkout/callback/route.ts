import { prisma } from '@/prisma/prisma-client';
import { OrderCancelledTemplate, OrderSuccessTemplate } from '@/shared/components';
import { sendEmail } from '@/shared/lib';
import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import { OrderStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  console.log('Webhook endpoint received a request');
  try {
    const event = (await req.json()) as Stripe.Event;

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      const orderId = Number(session.metadata?.orderId);

      if (!orderId) {
        console.error('No orderId found in session metadata.');
        return NextResponse.json({ error: 'No orderId provided in metadata' }, { status: 400 });
      }

      const order = await prisma.order.findUnique({
        where: { id: orderId },
      });

      if (!order) {
        console.error(`Order with id ${orderId} not found.`);
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }

      const isSucceeded = session.payment_status === 'paid';

      console.log(isSucceeded);

      await prisma.order.update({
        where: { id: orderId },
        data: { status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED },
      });

      const items = JSON.parse(order.items as string) as CartItemDTO[];

      if (isSucceeded) {
        await sendEmail(
          order.email,
          'Next Pizza | Your order has been placed',
          OrderSuccessTemplate({ orderId: order.id, items }),
        );
      } else {
        await sendEmail(
          order.email,
          'Next Pizza | Your order is not paid',
          OrderCancelledTemplate({ orderId: order.id, items }),
        );
      }

      console.log(`Order ${orderId} updated successfully.`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('[CHECKOUT CALLBACK]', error);
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}
