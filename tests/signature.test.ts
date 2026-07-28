import { signWebhook,verifyWebhook } from '@/lib/security/signature'
test('signs and verifies',()=>{const t=String(Math.floor(Date.now()/1000)),body='{"ok":true}',s=signWebhook('secret',t,body);expect(verifyWebhook('secret',t,body,s)).toBe(true);expect(verifyWebhook('wrong',t,body,s)).toBe(false)})
