import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  const accessToken = request.cookies.get("accessToken");

  if (!accessToken) {
    if (
      currentPath !== "/" &&
      currentPath !== "/sign-up" &&
      currentPath !== "/sign-in"
    ) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  } else {
    const response = await axios.get("http://localhost:4040/users/me", {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    });

    if (response.data.email) {
      if (currentPath === "/sign-up" || currentPath === "/sign-in") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } else {
      if (
        currentPath !== "/" &&
        currentPath !== "/sign-up" &&
        currentPath !== "/sign-in"
      ) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
