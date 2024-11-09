import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ['/', '/api/webhooks/clerk', '/api/webhooks/stripe'], // Corrected to 'publicRoutes' instead of 'publicRoutes '
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)", // Matches all non-static routes
    "/", // Matches the root
    "/api/:path*", // Matches all API routes
    "/trpc/:path*" // Matches all trpc routes if you're using tRPC
  ],
};
