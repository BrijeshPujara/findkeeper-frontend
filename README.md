# Findkeeper Frontend (React Native)

React Native app for staff and claimant journeys, scaffolded as a separate project from the CDK backend.

## Prerequisites

- Node.js `>= 20.19.4` (recommended: latest Node 20 LTS)
- npm `>= 10`

## Quick start

```bash
npm install
cp .env.example .env
npm run start
```

## Environment

- `EXPO_PUBLIC_API_BASE_URL`: backend base URL (defaults to `http://localhost:3000` if missing)

## Current structure

- `App.tsx`: journey switcher (`staff` and `claimant`)
- `src/config/env.ts`: environment and API base URL helpers
- `src/lib/api.ts`: typed API client for `/health`, `/items`, `/search`, `/claims`
- `src/screens/StaffIntakeScreen.tsx`: starter staff intake screen + backend health check
- `src/screens/ClaimantSearchScreen.tsx`: starter claimant search screen shell
- `src/types/contracts.ts`: API request/response types

## Validation

```bash
npm run typecheck
npm test
npm run test:coverage
```

## Next implementation slices

1. FE-101/102: add Cognito auth + item create + evidence upload flow
2. FE-103/104: wire list/read/search and intake telemetry
3. FE-201+: build claimant submit + reviewer decision UI
