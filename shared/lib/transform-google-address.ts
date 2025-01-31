import { Address } from '../store';

export const transformGoogleAddress = (addressComponents: any[]): Address => {
  const getComponent = (type: string) =>
    addressComponents.find((component: any) => component.types.includes(type))?.long_name || '';

  const address: Address = {
    addressLine1: `${getComponent('street_number')} ${getComponent('route')}`.trim(),
    city: getComponent('locality'),
    state: getComponent('administrative_area_level_1'),
    postalCode: getComponent('postal_code'),
    country: getComponent('country'),
  };

  return address;
};
