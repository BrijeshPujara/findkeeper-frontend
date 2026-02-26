# Findkeeper Frontend Architecture Plan

- Version: 1.0
- Date: 2026-02-26
- Owner: Frontend Engineering
- Status: Active

## Scope

- Repository: `findkeeper-frontend`
- Platform: Expo + React Native + TypeScript
- Primary consumers: venue staff and claimants

## Current Baseline

- App shell supports two journeys (`staff`, `claimant`) in `App.tsx`.
- API environment config in `src/config/env.ts`.
- Typed API gateway in `src/lib/api.ts` for health, items, search, claims.
- Starter journey screens:
  - `src/screens/StaffIntakeScreen.tsx`
  - `src/screens/ClaimantSearchScreen.tsx`

## Target Architecture

### App Layers

1. Presentation layer: screens + reusable UI components.
2. Domain layer: feature modules (`staffIntake`, `claimSubmission`, `reviewQueue`).
3. Data layer: API client + request/response mappers + error normalization.
4. App services: auth session, telemetry, feature flags, offline queue.

### Folder Direction

- `src/screens`: route-level UI containers.
- `src/features`: feature modules (state, hooks, UI slices).
- `src/components`: shared UI primitives.
- `src/lib`: API client, networking, utilities.
- `src/config`: runtime environment and constants.
- `src/types`: API and domain interfaces.

## API Contract Alignment

- Backend contract source: backend repo `docs/contracts/findkeeper-api-v1.openapi.yaml`.
- Frontend may only consume documented fields and status codes.
- Any backend contract drift requires a linked FE ticket update before merge.

## Security and Session Rules

- Staff routes require authenticated session context.
- Claimant flows follow backend OTP/magic-link policy once available.
- Tokens and sensitive session details are never logged in plaintext.

## Observability Requirements

- Every mutating action logs a frontend event with `requestId` correlation where available.
- Capture at minimum:
  - Intake started/completed/failed
  - Claim submit started/completed/failed
  - Reviewer decision action outcomes

## Definition of Ready for New FE Tickets

- Backend API contract section exists for required endpoint(s).
- Error codes and payload shape are documented.
- UX copy for empty/loading/error states is defined.
