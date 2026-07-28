# Heartbeat

Heartbeat is a multi-tenant uptime-monitoring SaaS for websites, APIs, TCP ports, SSL certificates, incidents, alerts, and public status pages.

This final project is wired as a full-stack MVP. It runs zero-config in memory for demos and switches to Neon + Clerk + Redis/BullMQ + Resend through environment variables for deployment.

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Production setup

1. Create a Clerk application, enable Organizations, and set `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`.
2. Create a Neon database, set `STORE_MODE=neon` and `DATABASE_URL`, then run `npm run db:push`.
3. Create Redis, set `REDIS_URL`, and run `npm run worker` as a separate service.
4. Configure Resend and `RESEND_FROM_EMAIL` for alert delivery.
5. Set a strong `CHECK_RUNNER_TOKEN` and deploy the web app to Vercel.
6. Configure the Clerk webhook endpoint at `/api/webhooks/clerk` for organization/user reconciliation.

## Product flow

Sign in → organization context → create monitor → queue or run a check → persist evidence → state machine opens or resolves an incident → outbox delivers email and signed webhook → public status page reads published state.

## API surface

- `GET /api/health`
- `GET /api/status`
- `GET|POST /api/monitors`
- `POST /api/checks/run`
- `POST /api/checks/simulate`
- `GET /api/incidents`
- `POST /api/integrations/webhooks`
- `POST /api/cron/schedule`
- `POST /api/webhooks/clerk`

Authenticated endpoints use the active Clerk organization in production. Local mode uses `x-organization-id` or `demo-org`.

## Test and build

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Important honesty

This package is an integrated MVP, not a completed compliance program. Before public launch, perform a real external security review, configure network egress controls for the worker, enable database backups, add monitoring for the monitoring system, and verify Clerk, Neon, Redis, and Resend credentials in staging.
