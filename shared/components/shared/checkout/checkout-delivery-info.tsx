import React from 'react';
import { WhiteBlock } from '../white-block';
import { FormTextarea } from '../form';
import { AddressInput } from '../address-input';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorText } from '../error-text';

interface Props {
  className?: string;
}

export const CheckoutDeliveryInfo: React.FC<Props> = ({ className }) => {
  const { control } = useFormContext();

  return (
    <div className={className}>
      <WhiteBlock title="3. Delivery address">
        <div className="flex flex-col gap-5">
          <Controller
            control={control}
            name="address"
            render={({ field, fieldState }) => (
              <>
                <AddressInput onChange={field.onChange} />
                {fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
              </>
            )}
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
