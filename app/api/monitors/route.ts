import { NextRequest,NextResponse } from 'next/server'
import { z } from 'zod'
import { organizationId,requireUser } from '@/lib/server/auth-context'
import { createMonitor,listMonitors } from '@/lib/server/repository'
export const runtime='nodejs'
const schema=z.object({name:z.string().trim().min(2).max(80),kind:z.enum(['http','tcp','ssl']),target:z.string().trim().min(3).max(2048)})
export async function GET(request:NextRequest){try{return NextResponse.json({monitors:await listMonitors(await organizationId(request))})}catch(e){return NextResponse.json({error:e instanceof Error?e.message:'Unauthorized.'},{status:401})}}
export async function POST(request:NextRequest){try{const ctx=await requireUser(request);const payload=schema.parse(await request.json());const m=await createMonitor({organizationId:ctx.orgId,...payload});return NextResponse.json({monitor:m},{status:201})}catch(e){return NextResponse.json({error:e instanceof Error?e.message:'Invalid monitor.'},{status:400})}}
