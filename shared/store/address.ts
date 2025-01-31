import { create } from 'zustand';

export interface Address {
  addressLine1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

interface State {
  address: Address;
  setAddress: (address: Address) => void;
}

export const useAddressStore = create<State>()((set) => ({
  address: {},
  setAddress: (address: Address) => set({ address }),
}));
