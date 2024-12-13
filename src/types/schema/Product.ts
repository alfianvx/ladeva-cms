export type TProduct = {
  id: string;
  name: string;
  short_description: string;
  description: string;
  logo_url: string;
  thumbnail_url: string;
  createdAt: string;
};

export type TProductForm = {
  name: string;
  short_description: string;
  description: string;
  logo_url?: string;
  thumbnail_url?: string;
};
