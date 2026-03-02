// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const isAuthenticated = request.cookies.get("site-auth");
  const isLoginPage = request.nextUrl.pathname === "/login";

  // If not authenticated and trying to access any page other than /login
  // if (!isAuthenticated && !isLoginPage) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  // If already authenticated and trying to go to /login, send them home
  if (isAuthenticated && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Don't run middleware on static files or images
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};