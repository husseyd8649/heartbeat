export type MonitorKind = 'http' | 'tcp' | 'ssl'
export type MonitorState = 'healthy' | 'pending_failure' | 'down' | 'pending_recovery'
export type IncidentStatus = 'open' | 'resolved'
export type Monitor = { id: string; organizationId: string; name: string; kind: MonitorKind; target: string; enabled: boolean; intervalSeconds: number; failureThreshold: number; recoveryThreshold: number; nextRunAt: string; currentState: MonitorState; failureStreak: number; successStreak: number; lastCheck?: CheckResult; createdAt: string }
export type CheckResult = { id: string; jobKey: string; monitorId: string; organizationId: string; ok: boolean; statusCode?: number; latencyMs: number; failureReason?: string; probeRegion: string; startedAt: string; completedAt: string }
export type Incident = { id: string; organizationId: string; monitorId: string; monitorName: string; status: IncidentStatus; title: string; openedAt: string; resolvedAt?: string }
export type WebhookEndpoint = { id: string; organizationId: string; url: string; secret: string; enabled: boolean; createdAt: string }
