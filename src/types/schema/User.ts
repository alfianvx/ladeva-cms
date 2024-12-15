export type TUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
};

export type TUserForm = {
  name?: string;
  email?: string;
  avatar?: string;
};

export type TUserRegistForm = {
  name: string;
  email: string;
  password: string;
  role: string;
};
