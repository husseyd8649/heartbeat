import { NextRequest,NextResponse } from 'next/server'
import { organizationId } from '@/lib/server/auth-context'
import { statusSnapshot } from '@/lib/server/repository'
export const runtime='nodejs'
export async function GET(request:NextRequest){try{return NextResponse.json(await statusSnapshot(await organizationId(request)))}catch(e){return NextResponse.json({error:e instanceof Error?e.message:'Unauthorized.'},{status:401})}}
