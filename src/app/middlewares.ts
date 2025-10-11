import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_ROUTES = [
  { path: "/api/admin/auth", methods: ["GET", "POST"] }, // login is public
  { path: "/api/events", methods: ["GET"] },              // only GET is public
  { path: "/api/partners", methods: ["POST"] },           // only POST is public
  { path: "/api/volunteers", methods: ["POST"] },         // only POST is public
];

// Function to check if route + method is public
function isPublic(pathname: string, method: string): boolean {
  return PUBLIC_ROUTES.some(route =>
    pathname.startsWith(route.path) && route.methods.includes(method)
  );
}

export async function middleware(req: Request) {
  const url = new URL(req.url);
  const { pathname } = url;
  const method = req.method;

  // Allow public routes
  if (isPublic(pathname, method)) {
    return NextResponse.next();
  }

  // Everything else requires authentication
  const cookieHeader = req.headers.get("cookie");
  const token = cookieHeader?.match(/token=([^;]+)/)?.[1];

  if (!token) {
    return NextResponse.json({ error: "Unauthorized - No token provided" }, { status: 401 });
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
    return NextResponse.next(); 
  } catch (error) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 403 });
  }
}

// Apply this middleware to API routes you want to check
export const config = {
  matcher: [
    "/api/:path*", // protect all APIs, we'll allow exceptions inside
  ],
};
