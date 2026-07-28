import { NextRequest,NextResponse } from 'next/server'
import { z } from 'zod'
import { requireUser } from '@/lib/server/auth-context'
import { createWebhook } from '@/lib/server/repository'
export const runtime='nodejs'
export async function POST(request:NextRequest){try{const ctx=await requireUser(request);const body=z.object({url:z.string().url()}).parse(await request.json());const endpoint=await createWebhook(ctx.orgId,body.url);return NextResponse.json({webhook:{id:endpoint.id,url:endpoint.url,secret:endpoint.secret}},{status:201})}catch(e){return NextResponse.json({error:e instanceof Error?e.message:'Could not create webhook.'},{status:400})}}
