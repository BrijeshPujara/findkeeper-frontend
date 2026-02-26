# FE-103 Evidence Upload UX

- Ticket ID: FE-103
- Iteration: 1
- Status: Planned
- Owner: Frontend
- Backend dependency: BK-102

## Objective

Provide reliable evidence upload UX with progress, retry, and guardrails.

## Acceptance Criteria

- Upload progress is visible.
- Recoverable failure path supports retry without duplicate record creation.
- Invalid file types/sizes show deterministic guidance.

## Verification Evidence

- Upload integration tests
- Retry/error scenario captures
