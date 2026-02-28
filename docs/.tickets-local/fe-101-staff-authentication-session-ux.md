# FE-101 Staff Authentication and Session UX

- Ticket ID: FE-101
- Iteration: 1
- Status: In progress (backend auth integration active)
- Owner: Frontend
- Backend dependency: BK-003

## Objective

Implement secure staff sign-in and reliable protected-session behavior.

## Acceptance Criteria

- Unauthenticated access is blocked from staff routes.
- Session timeout and recovery flows are clear.
- Role-sensitive UI actions are hidden/disabled correctly.

## Verification Evidence

- Auth journey E2E tests
- Session expiry behavior screenshots/logs

## Progress Update — 2026-02-27

### Implemented

- Frontend supports bearer-token based authenticated API usage via environment configuration.
- Staff and claimant journeys are wired for protected backend endpoints.

### Current Blockers

- Staff tenant-scoped endpoints can return `403` until tenant claim attributes are available in issued Cognito tokens.
- Runtime auth consistency depends on BK-003 closure and deployed backend parity.

### Next Steps

1. Re-run simulator journeys after backend deploy and tenant claim readiness.
2. Capture auth/session UX evidence once staff protected routes pass consistently.
3. Close FE-101 after end-to-end sign-in/session tests pass with production-like token claims.
