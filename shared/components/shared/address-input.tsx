'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="952d375a19c0206ecc53b2c5bad5c55cdb725ea3"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};
