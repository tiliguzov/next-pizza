export const mapPizzaSize = {
  20: 'small',
  30: 'medium',
  40: 'large',
} as const;

export const maxPizzaType = {
  1: 'traditional',
  2: 'thin',
} as const;

export const pizzaSizes = Object.entries(mapPizzaSize).map(([value, name]) => ({
  name,
  value,
}));
