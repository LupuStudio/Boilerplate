import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export type MiddlewareHandler = (
  req: NextRequest
) => Promise<NextResponse | void> | NextResponse | void

export function composeMiddlewares(middlewares: MiddlewareHandler[]): MiddlewareHandler {
  return async (req: NextRequest) => {
    for (const middleware of middlewares) {
      const res = await middleware(req)
      // If one middleware returns a response (like a redirect),
      // we stop the chain here
      if (res instanceof NextResponse) return res
    }
    return NextResponse.next()
  }
}
