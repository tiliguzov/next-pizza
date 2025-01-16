import React from 'react';
import { WhiteBlock } from '../white-block';
import { FormInput } from '..';

interface Props {
  className?: string;
}

export const CheckoutPersonalInfo: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="2. Personal information" className={className}>
      <div className="grid grid-cols-2 gap-5">
        <FormInput name="firstName" className="text-base" placeholder="name" />
        <FormInput name="lastName" className="text-base" placeholder="last name" />
        <FormInput name="email" className="text-base" placeholder="email" />
        <FormInput name="phone" className="text-base" placeholder="phone number" />
      </div>
    </WhiteBlock>
  );
};
