import { http } from "@/lib/http";
import { TTestimonialForm } from "@/types/schema/Testimonial";

export const getTestimonialsContent = async () => {
  return await http.get("/testimonial").then((response) => response.data);
};

export const getTestimonialContentById = async (
  id: string,
  token: string | undefined
) => {
  return await http
    .get(`/testimonial/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};

export const deleteTestimonialContent = (
  id: string,
  token: string | undefined
) => {
  return http.delete(`/testimonial/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createTestimonialContent = (
  data: TTestimonialForm,
  token: string | undefined
) => {
  return http.post("/testimonial", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateTestimonialContent = (
  id: string,
  data: TTestimonialForm,
  token: string | undefined
) => {
  return http.put(`/testimonial/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
