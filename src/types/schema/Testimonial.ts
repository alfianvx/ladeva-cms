export type TTestimonial = {
  id: string;
  name: string;
  profession: string;
  message: string;
  avatar_url: string;
  is_featured: boolean;
};

export type TTestimonialForm = {
  name: string;
  profession: string;
  message: string;
  avatar_url?: string;
  is_featured?: boolean;
};
