export const categories = [
  'tshirts',
  'jackets',
  'shoes',
  'pants',
  'accessories',
  'dresses'
] as const;

export type Category = typeof categories[number]; 