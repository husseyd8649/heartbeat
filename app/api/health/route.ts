import { NextResponse } from 'next/server'
export const runtime='nodejs'
export async function GET(){return NextResponse.json({ok:true,service:'heartbeat',time:new Date().toISOString(),store:process.env.STORE_MODE||'memory'})}
