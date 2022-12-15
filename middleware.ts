import { NextRequest, NextResponse } from "next/server";

import { AuthenticateResData } from "./pages/api/authenticate";

export async function middleware(request: NextRequest) {
  const host = request.headers.get("host");
  if (host === null) {
    return NextResponse.redirect(new URL("/missing-host", request.url)); // just a 404 page
  }

  const isAuthEndpoint = request.url.match(/(\/login$)|(\/signup$)/);
  const isHome = !isAuthEndpoint; // will need to change if more endpoints are added

  const authCookie = request.cookies.get("auth")?.value;
  if (authCookie === undefined) {
    if (!isHome) return;
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (isAuthEndpoint && authCookie !== undefined) {
    // midleware is run AGAIN for /home -> prevent additional fetching
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // now isHome === true && authCookie !== undefined
  const authEndpointUrl = new URL("http://127.0.0.1:3000/api/authenticate");
  console.time("fetch");
  const userLoggedInData: AuthenticateResData = await fetch(authEndpointUrl, {
    method: "POST",
    headers: { auth: authCookie },
  }).then(async (r) => {
    return r.json();
  });
  const userIsLoggedIn = userLoggedInData.loggedIn;
  console.timeEnd("fetch");
  if (!userIsLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/home", "/home/:segments*", "/login", "/signup"],
};

export default middleware;
