import { authUserSignIn } from "@/services/auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: { type: "email", required: true },
        password: { type: "password", required: true },
      },
      authorize: async (credentials) => {
        try {
          const user = await authUserSignIn(
            credentials.email as string,
            credentials.password as string
          );

          if (!user) {
            throw new Error("User not found.");
          }

          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.data.profile.id;
        token.name = user.data.profile.name;
        token.email = user.data.profile.email;
        token.picture = user.data.profile.avatar;
        token.role = user.data.profile.role;
        token.access_token = user.data.accessToken;
        token.refresh_token = user.data.refreshToken;
        token.user = user.data.profile;
      }
      if (trigger === "update" && session) {
        token.id = session.user.avatar;
        token.name = session.user.name;
        token.email = session.user.email;
        token.picture = session.user.avatar;
        token.role = session.user.role;
        token.access_token = session.access_token;
        token.refresh_token = session.refresh_token;
        token.user = session.user;
        return token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      session.access_token = token.access_token as string;
      session.refresh_token = token.refresh_token as string;
      return session;
    },
  },
});
