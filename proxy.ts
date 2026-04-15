import { NextResponse, type NextRequest } from "next/server";
// import { getToken } from "next-auth/jwt";
import createIntlMiddleware from "next-intl/middleware";

const locales = ["en", "el"];
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: "el",
});
// const protectedPaths = ["/acms", "/citizen, /erp", "/pef"];
// const authPaths = ["/login", "/register", "/expired", "/taxis", "/payments"];

// Token Expiration Checker
// const isTokenExpired = (token: any) => {
//   try {
//     if (!token || !token.exp) return true;
//     const currentTime = Math.floor(Date.now() / 1000);
//     return token.expired < currentTime;
//   } catch (e) {
//     console.error('Error checking token expiration:', e);
//     return true;
//   }
// };
export default async function proxyMiddleware(request: NextRequest) {
  const response = await intlMiddleware(request);
  // const { pathname } = request.nextUrl;
  // const locale = request.cookies.get('NEXT_LOCALE')?.value || 'en';

  return await handleAuthAndRedirects(request, response);
}

// Auth and Redirect Logic
async function handleAuthAndRedirects(
  request: NextRequest,
  response: NextResponse
) {
  // const token = await getToken({ req: request });
  // const { pathname } = request.nextUrl;
  // const locale = request.cookies.get("NEXT_LOCALE")?.value || "en";

  // const isPathMatching = (paths: string[]) =>
  //   paths.some((path) => {
  //     const specificPath = `/${locale}${path}`;
  //     return pathname.startsWith(specificPath);
  //   });

  // const isAuthPath = isPathMatching(authPaths);
  // const isProtectedPath = isPathMatching(protectedPaths);
  if (request.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }
  if (request.nextUrl.pathname === "/service-worker.js") {
    return NextResponse.next();
  }

  // when we are on login or auth pages we want to skip the middleware or it will get stuck
  // if (isAuthPath) {
  //   return response;
  // }

  // if (isProtectedPath) {
  //   if (!token || isTokenExpired(token)) {
  //     const redirectUrl = token ? `/${locale}/expired` : `/${locale}/login`;
  //     return NextResponse.redirect(new URL(redirectUrl, request.url));
  //   }
  // }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|locales|logomfa).*)",
  ],
};
