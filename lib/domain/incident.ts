import type { MonitorState } from '@/lib/shared/types'
export type IncidentAction = 'none' | 'open' | 'resolve'
export type Transition = { nextState: MonitorState; incidentAction: IncidentAction; reason: string }
export function transition(state: MonitorState, ok: boolean, failures: number, successes: number, failureThreshold = 2, recoveryThreshold = 2): Transition {
  if (ok) {
    if (state === 'down' && successes < recoveryThreshold) return { nextState: 'pending_recovery', incidentAction: 'none', reason: 'Recovery is pending.' }
    if ((state === 'down' || state === 'pending_recovery') && successes >= recoveryThreshold) return { nextState: 'healthy', incidentAction: 'resolve', reason: 'Recovery threshold reached.' }
    return { nextState: 'healthy', incidentAction: 'none', reason: 'Check passed.' }
  }
  if (state === 'healthy' && failures < failureThreshold) return { nextState: 'pending_failure', incidentAction: 'none', reason: 'Failure threshold not reached.' }
  if (state === 'pending_failure' && failures >= failureThreshold) return { nextState: 'down', incidentAction: 'open', reason: 'Failure threshold reached.' }
  if (state === 'pending_recovery') return { nextState: 'down', incidentAction: 'none', reason: 'Recovery interrupted by a failure.' }
  return { nextState: 'down', incidentAction: 'none', reason: 'Monitor remains down.' }
}