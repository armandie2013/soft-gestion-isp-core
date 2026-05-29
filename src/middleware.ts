import { NextResponse, type NextRequest } from "next/server";
import { getAuthCookieName, verifyAuthToken } from "@/lib/jwt";

const publicRoutes = ["/", "/login", "/registro"];

const roleHome = {
  admin: "/admin",
  cobrador: "/cobrador",
  cliente: "/cliente",
} as const;

function isPublicRoute(pathname: string) {
  return publicRoutes.includes(pathname);
}

function isStaticOrApi(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/health") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/logos") ||
    pathname.startsWith("/images")
  );
}

function isRoute(pathname: string, basePath: string) {
  return pathname === basePath || pathname.startsWith(`${basePath}/`);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isStaticOrApi(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(getAuthCookieName())?.value;
  const user = token ? await verifyAuthToken(token) : null;

  if (isPublicRoute(pathname)) {
    if (user && (pathname === "/login" || pathname === "/registro")) {
      if (user.debeCambiarPassword) {
        return NextResponse.redirect(new URL("/cambiar-password", request.url));
      }

      return NextResponse.redirect(new URL(roleHome[user.rol], request.url));
    }

    return NextResponse.next();
  }

  if (!user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);

    return NextResponse.redirect(loginUrl);
  }

  if (user.debeCambiarPassword && pathname !== "/cambiar-password") {
    return NextResponse.redirect(new URL("/cambiar-password", request.url));
  }

  if (!user.debeCambiarPassword && pathname === "/cambiar-password") {
    return NextResponse.redirect(new URL(roleHome[user.rol], request.url));
  }

  // Rutas administrativas generales
  if (
    (isRoute(pathname, "/usuarios") ||
      isRoute(pathname, "/clientes") ||
      isRoute(pathname, "/planes")) &&
    user.rol !== "admin"
  ) {
    return NextResponse.redirect(new URL(roleHome[user.rol], request.url));
  }

  // Panel admin
  if (isRoute(pathname, "/admin") && user.rol !== "admin") {
    return NextResponse.redirect(new URL(roleHome[user.rol], request.url));
  }

  // Panel cobrador
  if (isRoute(pathname, "/cobrador") && user.rol !== "cobrador") {
    return NextResponse.redirect(new URL(roleHome[user.rol], request.url));
  }

  // Panel cliente real: /cliente
  // Importante: esto NO debe capturar /clientes
  if (isRoute(pathname, "/cliente") && user.rol !== "cliente") {
    return NextResponse.redirect(new URL(roleHome[user.rol], request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};