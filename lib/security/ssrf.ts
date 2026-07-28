import dns from 'node:dns/promises'
import net from 'node:net'
export class UnsafeTargetError extends Error {}
function v4(ip: string) { return ip.split('.').reduce((n, p) => ((n << 8) + Number(p)) >>> 0, 0) }
export function isBlockedIp(ip: string): boolean {
  if (net.isIPv4(ip)) { const n=v4(ip); return [[v4('0.0.0.0'),v4('0.255.255.255')],[v4('10.0.0.0'),v4('10.255.255.255')],[v4('100.64.0.0'),v4('100.127.255.255')],[v4('127.0.0.0'),v4('127.255.255.255')],[v4('169.254.0.0'),v4('169.254.255.255')],[v4('172.16.0.0'),v4('172.31.255.255')],[v4('192.0.0.0'),v4('192.0.0.255')],[v4('192.168.0.0'),v4('192.168.255.255')],[v4('198.18.0.0'),v4('198.19.255.255')],[v4('224.0.0.0'),v4('255.255.255.255')]].some(([a,b])=>n>=a&&n<=b) }
  if (net.isIPv6(ip)) { const x=ip.toLowerCase(); return x==='::1'||x==='::'||x.startsWith('fc')||x.startsWith('fd')||/^fe[89ab]/.test(x) }
  return true
}
export async function assertSafeHostname(raw: string): Promise<void> { const host=raw.replace(/^\[|\]$/g,'').toLowerCase(); if (!host||host==='localhost'||host.endsWith('.local')||host.endsWith('.internal')||host==='metadata.google.internal') throw new UnsafeTargetError('Private or local hostnames are blocked.'); if (net.isIP(host)&&isBlockedIp(host)) throw new UnsafeTargetError('Private or special IPs are blocked.'); const records=await dns.lookup(host,{all:true,verbatim:true}); if(!records.length||records.some(r=>isBlockedIp(r.address))) throw new UnsafeTargetError('Target resolves to a blocked address.') }
export async function assertSafeHttpUrl(raw:string):Promise<URL>{let u:URL;try{u=new URL(raw)}catch{throw new UnsafeTargetError('Invalid URL.')}if(!['http:','https:'].includes(u.protocol)||u.username||u.password)throw new UnsafeTargetError('Only credential-free HTTP/HTTPS targets are allowed.');await assertSafeHostname(u.hostname);return u}
export function parseTcpTarget(raw:string){const m=raw.trim().match(/^\[?([^\]]+)\]?:([0-9]{1,5})$/);if(!m)throw new UnsafeTargetError('TCP target must be hostname:port.');const port=Number(m[2]);if(port<1||port>65535)throw new UnsafeTargetError('TCP port is invalid.');return {hostname:m[1],port}}
