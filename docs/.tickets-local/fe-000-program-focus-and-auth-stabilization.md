# FE-000 Program Focus and Auth Stabilization

- Ticket ID: FE-000
- Iteration: 0
- Status: In progress
- Date: 2026-02-28
- Owner: Product + Frontend Engineering

## Objective

Stabilize MVP foundations by reducing scope and completing reliable end-to-end staff and claimant journeys.

## In Scope (MVP Foundation Freeze)

1. Auth preflight and token workflow reliability.
2. Staff flow: capture -> search -> review decision.
3. Claimant flow: search -> claim -> tracking.
4. Contract-aligned API usage and error handling.
5. Repeatable simulator + API smoke testing.

## Out of Scope (Temporarily Deferred)

- White-label onboarding wizard UX.
- Advanced theming/customization controls.
- Non-critical UX enhancements outside core journeys.

## Acceptance Criteria

- [ ] `npm run auth:preflight:dev` reports no blocking auth-flow issues.
- [ ] Staff token completes staff MVP flow in simulator.
- [ ] Claimant token completes claimant MVP flow in simulator.
- [ ] API smoke test checklist is documented and repeatable.
- [ ] Frontend test suite is green for changed modules.

## Verification Evidence

- Preflight output snapshot.
- Staff + claimant simulator walkthrough notes.
- API smoke test response log.
- Test output summary.

## Dependencies

- FE-002 App Architecture Baseline
- FE-003 Design Tokens and Component Baseline
- FE-101 Staff Authentication and Session UX
- Backend BK-003 Runtime Auth Enforcement