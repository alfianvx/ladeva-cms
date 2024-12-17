export type TPricing = {
  id: string;
  title: string;
  description: string;
  offer: string[];
  is_featured?: boolean;
};

export type TPricingForm = {
  title: string;
  description: string;
  offer: string[];
  is_featured?: boolean;
};
