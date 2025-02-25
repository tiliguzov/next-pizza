export interface CartItemProps {
  id: number;
  imageUrl: string;
  details: string;
  name: string;
  price: string;
  quantity: number;
  disabled?: boolean;
}
