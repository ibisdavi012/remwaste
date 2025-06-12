export type Skip = {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
};

type SortOption = 'price_asc' | 'price_desc' | 'size_asc' | 'size_desc';

export const sortSkips = (skips: Skip[], option: SortOption): Skip[] => {
  switch (option) {
    case 'price_asc':
      return [...skips].sort((a, b) => a.price_before_vat - b.price_before_vat);
    case 'price_desc':
      return [...skips].sort((a, b) => b.price_before_vat - a.price_before_vat);
    case 'size_asc':
      return [...skips].sort((a, b) => a.size - b.size);
    case 'size_desc':
      return [...skips].sort((a, b) => b.size - a.size);
    default:
      return skips;
  }
}; 