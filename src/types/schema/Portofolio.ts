export type TPortofolio = {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  description: string;
  logo_url: string;
  thumbnail_url: string;
  createdAt: string;
};

export type TPortofolioForm = {
  name: string;
  short_description: string;
  description: string;
  logo_url?: string;
  thumbnail_url?: string;
};
