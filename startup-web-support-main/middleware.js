import { NextResponse } from "next/server";

/**
 * STRICT SUBDOMAIN CONFIGURATION:
 * The marketing page will ONLY open for this exact subdomain.
 */
export const ALLOWED_SUBDOMAINS = ["aanvigroup"];

/**
 * Check if the request is coming from an allowed subdomain (e.g. hello.startupwebsupport.com)
 */
function isAllowedSubdomain(request) {
  // 1. Check host header
  const host =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    "";

  // Strip port (e.g. hello.localhost:3000 -> hello.localhost)
  const hostname = host.split(":")[0].toLowerCase();

  // Check if hostname starts with an allowed subdomain:
  // e.g. "hello.startupwebsupport.com" or "hello.localhost"
  const matched = ALLOWED_SUBDOMAINS.find((sub) =>
    hostname.startsWith(`${sub}.`),
  );
  if (matched) return matched;

  // 2. Query param for testing: e.g. ?subdomain=hello
  const querySub =
    request.nextUrl.searchParams.get("subdomain") ||
    request.nextUrl.searchParams.get("mkt");
  if (querySub && ALLOWED_SUBDOMAINS.includes(querySub.toLowerCase())) {
    return querySub.toLowerCase();
  }

  return null;
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Skip static assets, Next internal files, and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const allowedSub = isAllowedSubdomain(request);

  // CASE 1: Visitor IS on the specific allowed subdomain ("hello")
  if (allowedSub) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-subdomain", allowedSub);
    requestHeaders.set("x-marketer", allowedSub);

    // If opening the root of hello.startupwebsupport.com (or hello.localhost),
    // rewrite internally to the marketing page
    if (pathname === "/") {
      const marketingUrl = request.nextUrl.clone();
      marketingUrl.pathname = "/marketing";
      marketingUrl.searchParams.set("subdomain", allowedSub);

      return NextResponse.rewrite(marketingUrl, {
        request: {
          headers: requestHeaders,
        },
      });
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // CASE 2: Visitor is NOT on the "hello" subdomain
  // If someone directly types "/marketing" on main domain or another subdomain,
  // block it and redirect to home page "/" so it ONLY exists on "hello"
  if (pathname.startsWith("/marketing")) {
    const homeUrl = request.nextUrl.clone();
    homeUrl.pathname = "/";
    homeUrl.search = "";
    return NextResponse.redirect(homeUrl);
  }

  // Normal request to main domain / any other subdomain: load standard pages
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next static & image files
     * - favicon.ico, icons, and static assets (.png, .jpg, .svg, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|icon.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf|mp4|webm|ico|txt|xml)$).*)",
  ],
};
