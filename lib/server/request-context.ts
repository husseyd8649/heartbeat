import type { NextRequest } from 'next/server'
export function isInternalRequest(request:NextRequest){return request.headers.get('x-check-runner-token')===(process.env.CHECK_RUNNER_TOKEN||'change-me')}
