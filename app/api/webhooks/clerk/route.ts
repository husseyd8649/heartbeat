import { NextRequest,NextResponse } from 'next/server'
export const runtime='nodejs'
export async function POST(request:NextRequest){const body=await request.text();if(!process.env.CLERK_WEBHOOK_SIGNING_SECRET)return NextResponse.json({received:true,mode:'unconfigured'});if(!body)return NextResponse.json({error:'Empty webhook.'},{status:400});return NextResponse.json({received:true})}
