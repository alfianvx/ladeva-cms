import "next-auth";

declare module "next-auth" {
  interface User {
    data: {
      profile: {
        id: string;
        name: string;
        email: string;
        role: string;
        avatar: string;
      };
      accessToken: string;
      refreshToken: string;
    };
  }
  interface Session {
    user: AdapterUser & {
      name: string;
      email: string;
      role: string;
      picture: string;
    };
    access_token: string;
    refresh_token: string;
  }
}
