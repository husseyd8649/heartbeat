import { neon } from '@neondatabase/serverless'
export const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null
export const isNeon = process.env.STORE_MODE === 'neon' && Boolean(sql)
