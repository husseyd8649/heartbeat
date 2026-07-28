import { NextRequest,NextResponse } from 'next/server'
import { z } from 'zod'
import { organizationId } from '@/lib/server/auth-context'
import { findMonitor,recordCheck } from '@/lib/server/repository'
export const runtime='nodejs'
export async function POST(request:NextRequest){try{const org=await organizationId(request);const body=z.object({monitorId:z.string().min(1),outcome:z.enum(['up','down'])}).parse(await request.json());const m=await findMonitor(body.monitorId,org);if(!m)return NextResponse.json({error:'Monitor not found.'},{status:404});const now=new Date().toISOString();const result={id:crypto.randomUUID(),jobKey:`simulation:${m.id}:${Date.now()}`,monitorId:m.id,organizationId:org,ok:body.outcome==='up',latencyMs:body.outcome==='up'?180:0,failureReason:body.outcome==='up'?undefined:'Simulated HTTP 503',probeRegion:'local',startedAt:now,completedAt:now};return NextResponse.json({result,outcome:await recordCheck(result)})}catch(e){return NextResponse.json({error:e instanceof Error?e.message:'Could not simulate check.'},{status:400})}}
