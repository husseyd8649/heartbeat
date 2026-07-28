import crypto from 'node:crypto'
export function signWebhook(secret: string, timestamp: string, body: string): string { return crypto.createHmac('sha256', secret).update(`${timestamp}.${body}`).digest('hex') }
export function verifyWebhook(secret:string,timestamp:string,body:string,signature:string,maxAgeSeconds=300):boolean { const age=Math.abs(Math.floor(Date.now()/1000)-Number(timestamp)); if(!Number.isFinite(age)||age>maxAgeSeconds)return false; const expected=signWebhook(secret,timestamp,body); return crypto.timingSafeEqual(Buffer.from(expected),Buffer.from(signature)) }
export function randomSecret(): string { return crypto.randomBytes(32).toString('hex') }
