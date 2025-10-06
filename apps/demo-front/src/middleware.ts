import { composeMiddlewares } from "./lib/middlewares"
import { authMiddleware } from "./lib/middlewares/authMiddleware"
import { loggerMiddleware } from "./lib/middlewares/loggerMiddleware"

const middlewarePipeline = composeMiddlewares([
  // loggerMiddleware,
  authMiddleware,
])

export const middleware = middlewarePipeline

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
