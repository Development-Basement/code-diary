import { NextRequest, NextResponse } from "next/server";
import { AuthenticateResData } from "./pages/api/authenticate";

export async function middleware(request: NextRequest) {
  const host = request.headers.get("host");
  if (host === null) {
    return NextResponse.redirect(new URL("/missing-host", request.url)); // just a 404 page
  }

  let userIsLoggedIn;
  const authCookie = request.cookies.get("auth")?.value;
  if (authCookie === undefined) {
    userIsLoggedIn = false;
  } else {
    const authEndpointUrl = new URL("/api/authenticate", request.url);
    const userLoggedInData: AuthenticateResData = await fetch(authEndpointUrl, {
      method: "POST",
      headers: { auth: authCookie },
    }).then(async (r) => {
      console.log(r.text);
      return r.json();
    });
    userIsLoggedIn = userLoggedInData.loggedIn;
  }

  const isAuthEndpoint = request.url.match(/(\/login$)|(\/signup$)/);
  if (isAuthEndpoint && userIsLoggedIn) {
    return NextResponse.redirect(new URL("/home", request.url));
  }
  const isHome = !isAuthEndpoint; // will need to change if more endpoints are added
  if (!userIsLoggedIn && isHome) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/home", "/home/:segments*", "/login", "/signup"],
};

export default middleware;
