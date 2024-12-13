export type TMember = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  role: string;
  createdAt: string;
};

export type TMemberForm = {
  avatar?: string;
  name: string;
  email: string;
  role: string;
};
