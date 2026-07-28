import { auth } from '@clerk/nextjs/server'
import type { NextRequest } from 'next/server'
export async function organizationId(request?: NextRequest): Promise<string> {
  if (process.env.STORE_MODE !== 'neon' && !process.env.CLERK_SECRET_KEY) return request?.headers.get('x-organization-id') || process.env.DEMO_ORGANIZATION_ID || 'demo-org'
  const session = await auth()
  if (!session.orgId) throw new Error('Select an organization before continuing.')
  return session.orgId
}
export async function requireUser(request?: NextRequest) { if (process.env.STORE_MODE !== 'neon' && !process.env.CLERK_SECRET_KEY) return { userId: 'demo-user', orgId: await organizationId(request) }; const session=await auth(); if(!session.userId||!session.orgId)throw new Error('Authentication required.'); return {userId:session.userId,orgId:session.orgId} }
