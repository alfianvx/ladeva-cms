export type TMember = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  role: string;
};

export type TMemberForm = {
  avatar?: string;
  name: string;
  email: string;
  role: string;
};
