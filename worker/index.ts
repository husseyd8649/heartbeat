import { checkWorker } from '@/lib/server/queue'
import { findMonitor,recordCheck } from '@/lib/server/repository'
import { runMonitor } from '@/lib/server/checker'
const worker=checkWorker(async job=>{const m=await findMonitor(job.data.monitorId,job.data.organizationId);if(!m)throw new Error('Monitor not found.');const result=await runMonitor(m);await recordCheck(result)});worker.on('completed',job=>console.log('check complete',job.id));worker.on('failed',(job,e)=>console.error('check failed',job?.id,e));console.log('Heartbeat check worker online')
