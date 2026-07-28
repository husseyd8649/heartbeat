# Security baseline

## Tenant isolation

Every authenticated request resolves an organization ID. Every tenant-owned query includes that ID. Clerk handles membership and roles; the application still enforces authorization server-side.

## SSRF defense

The probe rejects localhost, loopback, private IPv4/IPv6, link-local, multicast, metadata hostnames, credentials in URLs, unsafe protocols, excessive redirects, oversized bodies, and unbounded timeouts. Redirect targets are validated again.

## Delivery safety

Queue jobs and notification events have deterministic keys. Outbound webhooks use timestamped HMAC signatures, replay windows, and delivery IDs. External side effects should be emitted after the database state commit.

## Operational rules

Run the worker outside Vercel, restrict its egress at the network layer, redact secrets and response bodies from logs, rotate webhook secrets, and keep audit records. Do not enable private-network monitoring without a separate allowlist and customer-controlled runner design.
