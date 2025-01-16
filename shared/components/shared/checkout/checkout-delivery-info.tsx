import React from 'react';
import { WhiteBlock } from '../white-block';
import { FormTextarea } from '../form';
import { AddressInput } from '../address-input';

interface Props {
  className?: string;
}

export const CheckoutDeliveryInfo: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <WhiteBlock title="3. Delivery address">
        <div className="flex flex-col gap-5">
          <AddressInput />
          <FormTextarea
            name="comment"
            rows={5}
            className="text-base"
            placeholder="comment on the order"
          />
        </div>
      </WhiteBlock>
    </div>
  );
};
