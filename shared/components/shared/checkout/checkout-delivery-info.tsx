import React from 'react';
import { WhiteBlock } from '../white-block';
import { FormTextarea } from '../form';
import { AddressInput } from '../form/address-input';

interface Props {
  className?: string;
}

export const CheckoutDeliveryInfo: React.FC<Props> = ({ className }) => {
  const handleAddressValidationChange = (isValid: boolean) => {
    console.log('Address Valid:', isValid);
  };

  return (
    <div className={className}>
      <WhiteBlock title="3. Delivery address">
        <div className="flex flex-col gap-5">
          <AddressInput
            name="address"
            idName="addressId"
            className="text-base"
            onValidationChange={handleAddressValidationChange}
          />
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
