-- Enable RLS after verifying the application role strategy in staging.
-- The app must set a trusted request.jwt.claims.org_id before querying.
alter table monitors enable row level security;
alter table check_results enable row level security;
alter table incidents enable row level security;
alter table webhooks enable row level security;
create policy monitors_org_isolation on monitors using (organization_id::text = current_setting('request.jwt.claims.org_id', true));
create policy checks_org_isolation on check_results using (organization_id::text = current_setting('request.jwt.claims.org_id', true));
create policy incidents_org_isolation on incidents using (organization_id::text = current_setting('request.jwt.claims.org_id', true));
create policy webhooks_org_isolation on webhooks using (organization_id::text = current_setting('request.jwt.claims.org_id', true));
