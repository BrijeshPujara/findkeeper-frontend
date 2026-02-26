# FE-002 App Architecture Baseline

- Ticket ID: FE-002
- Iteration: 0
- Status: In Progress
- Owner: Frontend
- Backend dependency: BK-002

## Objective

Establish routing, state/data boundaries, API client conventions, and auth/session scaffolding.

## Current Progress (2026-02-26)

- Expo TypeScript project created in separate repo.
- Journey shell implemented for `staff` and `claimant`.
- Environment-driven API base URL and typed API client added.
- Initial staff and claimant starter screens implemented.

## Remaining Work

- Add formal navigation structure.
- Add auth context + protected route handling.
- Define normalized API error model and retries.

## Acceptance Criteria

- Shared API client and error conventions documented.
- Route guards and auth context scaffolding in place.
- Type checks pass.

## Verification Evidence

- `npm run typecheck` output
- Architecture notes in `docs/findkeeper-frontend-architecture-plan.md`
