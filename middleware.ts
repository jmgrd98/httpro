import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // ignoredRoutes: 'http://localhost:3000/favicon.ico/'
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)","/","/(api|trpc)(.*)"],
};