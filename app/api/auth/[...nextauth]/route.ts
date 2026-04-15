import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { isNil } from "lodash";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const authOptions: NextAuthOptions = {
   debug: true,
   secret: process.env.SECRET_NEXTAUTH,
   pages: {
      signIn: "login",
      error: "/login/error",
   },
   callbacks: {
      async jwt({ token, user, account, trigger, session }: any) {
         if (trigger === "update") {
            // TODO: change later if I update token
            // const newToken: any = jwtDecode(session.accessToken);
            // const token = {
            //   org: newToken?.orgId,
            //   orgName: newToken?.orgName,
            //   accessToken: session.accessToken,
            // };
            // return token;
         }

         if (user) return { ...token, ...user };

         // if (account) {
         //   token.accessToken = account.accessToken;
         // }

         return token;
      },
      async session({ token }: any) {
         // it returns session which is empty and token
         return token;
      },
   },
   providers: [
      // CitizenTaxis
      CredentialsProvider({
         // CitizenTaxis is for both citizen and eauctions from another vendor
         id: "CitizenTaxis",
         name: "CitizenTaxis",
         credentials: {
            code: { label: "Authorization Code", type: "text" },
         },
         async authorize(credentials): Promise<any> {
            try {
               const { code } = credentials || {};
               if (!code) {
                  console.log(new Error("Authorization code not provided."));
               }
               const res = await axios.post(
                  `${process.env.PUBLIC_API_BASE_URL}/backend/api/acms/auth/taxis/${code}`
               );
               if (res.status !== 200) throw new Error("Error authenticating");
               const accessToken = res?.data?.accessToken;

               if (isNil(accessToken)) return null;

               const userFromToken: any = jwtDecode(accessToken);
               if (isNil(userFromToken)) return null;

               const { orgId, orgName, dt, roles } = userFromToken;

               // SECURITY: Only return non-sensitive data in the token
               // Fetch sensitive user data (AFM, AMKA, etc.) via API calls when needed
               return {
                  accessToken,
                  org: {
                     orgId,
                     orgName,
                  },
                  loginTimestamp: dt,
                  role: roles,
               };
            } catch (error) {
               console.error("Taxis Citizen authorize error:", error);
               return null;
            }
         },
      }),
   ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
