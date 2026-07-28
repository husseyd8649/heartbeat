import { isBlockedIp } from '@/lib/security/ssrf'
test.each(['127.0.0.1','10.0.0.1','172.16.0.1','192.168.1.1','169.254.169.254','::1'])('blocks %s',(ip)=>expect(isBlockedIp(ip)).toBe(true))
test('allows public IP',()=>expect(isBlockedIp('8.8.8.8')).toBe(false))
