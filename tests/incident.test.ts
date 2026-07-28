import { transition } from '@/lib/domain/incident'
test('first failure is pending',()=>expect(transition('healthy',false,1,0).nextState).toBe('pending_failure'))
test('second failure opens',()=>expect(transition('pending_failure',false,2,0).incidentAction).toBe('open'))
test('two successes resolve',()=>expect(transition('down',true,0,2).incidentAction).toBe('resolve'))
