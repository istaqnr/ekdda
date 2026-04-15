// import NextAuth from 'next-auth';

declare module "next-auth" {
   interface Session {
      user: any;
      expires: string;
      accessToken: string;
      org: string;
      orgName: string;
      loginTimestamp: number;
      guid?: string;
   }
}

export type T = (key: string, values?: Record<string, any>) => string;
