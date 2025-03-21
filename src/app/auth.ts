import NextAuth, { AuthOptions, User as NextAuthUser } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

interface Credentials {
  password: string;
}

export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 365 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Credentials | undefined): Promise<NextAuthUser | null> {
        const hashedPassword: string = process.env.HASHED_PASSWORD || "";

        if (!credentials?.password) {
          console.log(`Empty key verification attempt at ${new Date().toISOString()}`);
          throw new Error("empty_key");
        }

        if (await bcrypt.compare(credentials.password, hashedPassword)) {
          console.log(`key verified attempt at ${new Date().toISOString()}`);
          return { id: '1', name: 'User' };
        } else {
          console.log(`Invalid key verification attempt at ${new Date().toISOString()} ${hashedPassword}`);
          throw new Error("invalid_key");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user?: NextAuthUser }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.timestamp = Date.now();
        token.status = "correct";
      }
      return token;
    },

    async session({ session, token }: { session: any; token: any }): Promise<any> {
      if (session.user) {
        session.user.id = token.id;
        session.user.timestamp = token.timestamp;
        session.user.status = token.status;
      }
      return session;
    }

  },
};