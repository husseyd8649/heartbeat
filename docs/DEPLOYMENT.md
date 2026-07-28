# Deployment checklist

## Web

- Vercel project points at the repo root.
- `vercel.json` cron invokes `/api/cron/schedule` every minute.
- The cron route is protected with `CHECK_RUNNER_TOKEN`.
- Production URL and Clerk allowed origins are configured.

## Database

- Apply Drizzle schema to a Neon branch first.
- Promote after migration review.
- Enable backup and point-in-time recovery.
- Set `STORE_MODE=neon`.

## Worker

- Deploy `npm run worker` on a long-lived Node service.
- Set `HEARTBEAT_APP_URL`, `CHECK_RUNNER_TOKEN`, and `DEMO_ORGANIZATION_ID` only for local/single-tenant mode.
- For multi-tenant scheduling, use the queue worker in `worker/index.ts` and add a scheduler fan-out job per due monitor.

## Launch gate

Do not launch if cross-tenant access is possible, retries duplicate alerts, internal addresses can be probed, or the public status page disagrees with persisted incident state.
