import { NextRequest,NextResponse } from 'next/server'
import { isInternalRequest } from '@/lib/server/request-context'
import { organizationId } from '@/lib/server/auth-context'
import { enqueueDueMonitors } from '@/lib/server/runner'
export const runtime='nodejs'
export async function POST(request:NextRequest){if(!isInternalRequest(request))return NextResponse.json({error:'Unauthorized.'},{status:401});try{return NextResponse.json(await enqueueDueMonitors(await organizationId(request)))}catch(e){return NextResponse.json({error:e instanceof Error?e.message:'Scheduler failed.'},{status:500})}}
