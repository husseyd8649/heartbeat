import { NextRequest,NextResponse } from 'next/server'
import { z } from 'zod'
import { organizationId } from '@/lib/server/auth-context'
import { runMonitor } from '@/lib/server/checker'
import { findMonitor,recordCheck } from '@/lib/server/repository'
export const runtime='nodejs'
export async function POST(request:NextRequest){try{const org=await organizationId(request);const body=z.object({monitorId:z.string().min(1)}).parse(await request.json());const m=await findMonitor(body.monitorId,org);if(!m)return NextResponse.json({error:'Monitor not found.'},{status:404});const result=await runMonitor(m);const outcome=await recordCheck(result);return NextResponse.json({result,outcome})}catch(e){return NextResponse.json({error:e instanceof Error?e.message:'Could not run check.'},{status:500})}}
