import React from 'react';

interface Props {
  orderId: number;
  totalPrice: number;
  paymentUrl: string;
}

export const PayOrderTemplate: React.FC<Props> = ({ orderId, totalPrice, paymentUrl }) => (
  <div>
    <h1> Order #{orderId}</h1>

    <p>
      {' '}
      Please pay for the order of <b>${totalPrice}</b>. Follow <a href={paymentUrl}>this link</a> to
      make the payment.
    </p>
  </div>
);
