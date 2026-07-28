import { Queue, Worker, type JobsOptions } from 'bullmq'
import IORedis from 'ioredis'
export const queueName='heartbeat-checks'
export function redisConnection(){return new IORedis(process.env.REDIS_URL||'redis://localhost:6379',{maxRetriesPerRequest:null,password:process.env.REDIS_TOKEN||undefined})}
export function checkQueue(){return new Queue(queueName,{connection:redisConnection()})}
export const defaultJobOptions:JobsOptions={removeOnComplete:{count:1000},removeOnFail:{count:1000},attempts:3,backoff:{type:'exponential',delay:1000}}
export function checkWorker(handler:(job:{data:{monitorId:string;organizationId:string}})=>Promise<void>){return new Worker(queueName,handler,{connection:redisConnection(),concurrency:10})}
