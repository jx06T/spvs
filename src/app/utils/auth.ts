import { AuthOptions, User as NextAuthUser, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

interface Credentials {
  password: string;
}

interface CustomJWT extends JWT {
  id: string;
  name: string;
  timestamp: number;
  status: string;
}

interface CustomSession extends Session {
  user: {
    id: string;
    name?: string;
    email?: string;
    image?: string;
    timestamp: number;
    status: string;
  };
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
    async jwt({ token, user }: { token: JWT; user?: NextAuthUser }): Promise<CustomJWT> {
      const customToken = token as CustomJWT;

      if (user) {
        customToken.id = user.id;
        customToken.name = user.name || '';
        customToken.timestamp = Date.now();
        customToken.status = "correct";
      }

      return customToken;
    },

    async session({ session, token }: { session: Session; token: JWT }): Promise<CustomSession> {
      const customSession = session as CustomSession;
      const customToken = token as CustomJWT;

      if (customSession.user) {
        customSession.user.id = customToken.id;
        customSession.user.timestamp = customToken.timestamp;
        customSession.user.status = customToken.status;
      }

      return customSession;
    }
  },
};