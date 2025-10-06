import type { NextRequest } from 'next/server'

export async function loggerMiddleware(req: NextRequest) {
  console.log(`[Middleware - LOG] : [${new Date().toISOString()}] ${req.method} ${req.nextUrl.pathname}`)
}
