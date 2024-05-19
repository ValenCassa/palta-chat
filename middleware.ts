import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/auth/login",
  "/api/webhooks",
  "/auth/login/sso-callback",
  "/public/(.*)",
]);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect({
      unauthenticatedUrl: new URL("/auth/login", request.url).toString(),
    });
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|chat)(.*)"],
};
