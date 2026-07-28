import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
export default process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? clerkMiddleware() : function middleware(){return NextResponse.next()}
export const config={matcher:['/((?!_next|.*\\..*).*)']}
