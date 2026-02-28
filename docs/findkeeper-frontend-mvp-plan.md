# Findkeeper Frontend MVP Plan

- Version: 1.0
- Date: 2026-02-26
- Owner: Product + Frontend Engineering
- Status: Execution-ready

## Execution Mode (Temporary)

- Mode: MVP foundation first
- Effective date: 2026-02-28
- Included: auth reliability, core staff/claimant E2E flows, contract alignment, repeatable testability.
- Deferred: white-label expansion and non-critical feature work until core flow stability is proven.

## Status Tracking

- Foundation focus ticket: `docs/.tickets-local/fe-000-program-focus-and-auth-stabilization.md`

## Goals

- Build a minimal, high-utility frontend that consumes stable backend contracts.
- Prioritize staff operations first, then claimant self-service.
- Keep UX simple, fast, and secure with clear failure handling.

## Product Surfaces for MVP

- Staff app (mobile-first): authenticate, log found items, review claims.
- Claimant portal: submit claim, view claim status timeline.
- Admin-lite settings (deferred until backend maturity): optional in post-MVP hardening.

## Working Principles

- Contract-first: no frontend endpoint assumptions outside backend contract docs.
- Security by default: least-privilege UI actions and safe error messaging.
- Resilient UX: retries, idempotent submit patterns, explicit status visibility.
- Accessibility and performance are required, not optional enhancements.

## Iteration 0 — UX Contracts and Foundations

### Objective

Lock user flows, API integration contracts, and frontend architecture baseline before feature coding.

### Tickets

#### FE-001 Experience Map and Flow Contracts

- Request: define complete staff and claimant user journeys with success/failure states.
- Output artifact: `docs/.tickets-local/fe-001-experience-map-flow-contracts.md`.
- Dependencies: backend BK-002.

#### FE-000 Program Focus and Auth Stabilization

- Request: enforce scope freeze and complete reliable auth + E2E core journeys before expansion.
- Output artifact: `docs/.tickets-local/fe-000-program-focus-and-auth-stabilization.md`.
- Status: in progress (2026-02-28).
- Dependencies: FE-002, FE-003, FE-101, backend BK-003.

#### FE-002 App Architecture Baseline

- Request: establish frontend structure (routing, state/data layer, API client boundaries).
- Output artifact: `docs/.tickets-local/fe-002-app-architecture-baseline.md`.
- Status: in progress (2026-02-26).
- Dependencies: FE-001.

#### FE-003 Design Tokens and Component Baseline

- Request: create minimal reusable component set for forms, lists, detail cards, and status chips.
- Output artifact: `docs/.tickets-local/fe-003-design-tokens-component-baseline.md`.
- Dependencies: FE-002.

#### FE-004 Telemetry and Error Instrumentation

- Request: instrument key frontend events for task completion and failures.
- Output artifact: `docs/.tickets-local/fe-004-telemetry-error-instrumentation.md`.
- Dependencies: FE-002.

## Iteration 1 — Staff Intake Experience

### Objective

Enable staff to log found items quickly with reliable upload and recovery paths.

### Tickets

#### FE-101 Staff Authentication and Session UX

- Request: implement secure sign-in and session handling for staff users.
- Output artifact: `docs/.tickets-local/fe-101-staff-authentication-session-ux.md`.
- Dependencies: backend BK-003.

#### FE-102 Found Item Capture Form

- Request: implement optimized intake form with validation and guided field entry.
- Output artifact: `docs/.tickets-local/fe-102-found-item-capture-form.md`.
- Dependencies: FE-003, backend BK-101.

#### FE-103 Evidence Upload UX

- Request: provide resilient image upload flow with progress and retry.
- Output artifact: `docs/.tickets-local/fe-103-evidence-upload-ux.md`.
- Dependencies: FE-102, backend BK-102.

#### FE-104 Staff Item List, Detail, and Search

- Request: build tenant-scoped list and detail views with basic search/filter.
- Output artifact: `docs/.tickets-local/fe-104-staff-item-list-detail-search.md`.
- Dependencies: backend BK-103.

## Iteration 2 — Claimant Submission and Tracking

### Objective

Enable claimants to submit claims and monitor status with clear, secure communication.

### Tickets

#### FE-201 Claimant Access and Verification UX

- Request: implement claimant access flow aligned to OTP/magic-link backend policy.
- Dependencies: backend BK-201.

#### FE-202 Claim Submission Experience

- Request: build guided claim form with evidence prompts and ownership explanation fields.
- Dependencies: FE-201, backend BK-201.

#### FE-203 Claim Status Timeline

- Request: show claim state progression and next actions.
- Dependencies: backend BK-202, BK-203.

#### FE-204 Staff Review Queue and Decisions

- Request: create reviewer queue to process approve/reject/request-evidence decisions.
- Dependencies: backend BK-204.

## Iteration 3 — AI-Assisted Review and Frontend Hardening

### Objective

Increase reviewer throughput with safe AI assistance and improve trust/safety UX.

### Tickets

#### FE-301 AI Match Suggestion UI

- Request: present candidate matches with confidence and reason metadata.
- Dependencies: backend BK-302.

#### FE-302 Override and Escalation UX

- Request: support manual override and escalation when AI suggestions are weak/conflicting.
- Dependencies: FE-301, backend BK-303.

#### FE-303 Trust and Abuse Signals in Review UI

- Request: surface risk signals and fraud hints without exposing sensitive internals.
- Dependencies: backend BK-304.

#### FE-304 Frontend Performance and Accessibility Pass

- Request: run focused performance/accessibility hardening across MVP surfaces.
- Dependencies: FE-101 through FE-303.

## Monitoring Model (GitHub Projects Ready)

- Suggested fields: `Ticket ID`, `Iteration`, `Status`, `Priority`, `Owner`, `Dependencies`, `Acceptance Criteria`, `Verification Evidence`, `Target Sprint`.
- Status lifecycle: `Planned` → `In Progress` → `Blocked` → `In Review` → `Done`.
- Rule: no ticket moves to `Done` without linked evidence from tests, telemetry, or demo notes.

## Definition of Done (Global)

- Frontend checks pass (type, lint, tests) for changed modules.
- Critical path UX flows validated in staging.
- Accessibility and error states validated for modified screens.
- Instrumentation updated for new behavior.
- Project ticket contains verification evidence.
